'use server';

import { getUserNameOrId } from '@/helpers/data';
import { db } from '@/prisma/client';
import { WorkoutFormData } from '@/types';
import { currentUser } from '@clerk/nextjs';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

const sanitizeInput = (input: string) => input.replace(/[^a-zA-Z0-9 ]/g, '');

export const saveWorkoutAction = async (data: WorkoutFormData) => {
  const authUser = await currentUser();

  if (!authUser) {
    return {
      error: 'Password is not valid',
    };
  }

  const email = authUser.emailAddresses[0].emailAddress;
  const username = getUserNameOrId(authUser);

  const workoutTitle = data?.title ?? `${data.mode}-${data.target}`;
  const workoutName = `${username}::${workoutTitle}`;

  try {
    // check if there is a user with the same email
    // if so update the name
    // otherwise create a new user
    const user = await db.user.upsert({
      where: {
        email,
      },
      update: {
        name: username,
      },
      create: {
        email,
        name: username,
      },
    });

    // check if there is a workout with the same name
    // if so replace all the data with the new data
    // otherwise create a new workout

    const basePayload = {
      mode: data.mode,
      name: workoutName,
      notes: sanitizeInput(data.notes ?? ''),
      target: data.target,
      exercises: {
        create: data.exercises,
      },
    };

    const workout = await db.workout.upsert({
      where: {
        name: workoutName,
        userId: user.id,
      },
      update: {
        ...basePayload,
      },
      create: {
        ...basePayload,
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
