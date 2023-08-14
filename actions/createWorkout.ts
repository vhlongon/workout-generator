'use server';

import { db } from '@/prisma/client';
import { WorkoutFormData } from '@/types';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

const getUserName = (user: User) => {
  return (
    user.username ||
    `${user.firstName} ${user.lastName}` ||
    user.emailAddresses[0].emailAddress
  );
};

export const createWorkout = async (data: WorkoutFormData) => {
  const authUser = await currentUser();

  if (!authUser) {
    return {
      error: 'Password is not valid',
    };
  }

  const workoutName = ('name' in data ? data.name : 'New Workout') as string;

  const email = authUser.emailAddresses[0].emailAddress;
  const name = getUserName(authUser);

  try {
    // check if there is a user with the same email
    // if so update the name
    // otherwise create a new user
    const user = await db.user.upsert({
      where: {
        email,
      },
      update: {
        name,
      },
      create: {
        email,
        name,
      },
    });

    // check if there is a workout with the same name
    // if so replace all the data with the new data
    // otherwise create a new workout

    const workout = await db.workout.upsert({
      where: {
        name: workoutName,
        userId: user.id,
      },
      update: {
        mode: data.mode,
        name: workoutName,
        target: data.target,
        exercises: {
          deleteMany: {},
          create: data.exercises,
        },
      },
      create: {
        mode: data.mode,
        name: workoutName,
        target: data.target,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return workout;
  } catch (error) {
    return {
      error: (error as PrismaClientValidationError).message,
    };
  }
};
