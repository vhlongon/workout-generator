'use server';

import { getUserNameOrId } from '@/helpers/data';
import { sanitizeInput } from '@/helpers/format';
import { db } from '@/prisma/client';
import { WorkoutFormData } from '@/types';
import { currentUser } from '@clerk/nextjs';
import { Exercise } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

export const saveWorkoutAction = async (data: WorkoutFormData) => {
  const authUser = await currentUser();

  if (!authUser) {
    return {
      error: 'Password is not valid',
    };
  }

  const email = authUser.emailAddresses[0].emailAddress;
  const username = getUserNameOrId(authUser);
  const workoutName = data?.name ?? `${data.mode}-${data.target}`;

  try {
    // check if there is a user with the same email
    // if so update the name otherwise create a new user
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

    // check if there is a workout with the same name for the user
    // if so update the workout otherwise create a new workout

    const workoutPayload = {
      mode: data.mode,
      name: workoutName,
      notes: sanitizeInput(data.notes ?? ''),
      target: data.target,
    };

    const workout = await db.workout.upsert({
      where: {
        name_userId: {
          userId: user.id,
          name: workoutName,
        },
      },
      update: {
        ...workoutPayload,
      },
      create: {
        ...workoutPayload,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const existingExercises = await db.exercise.findMany({
      where: {
        workout: {
          id: workout.id,
        },
      },
    });

    const updatedExercises: Exercise[] = [];

    // check if there is an exercise with the same name for the workout
    // if so update the exercise otherwise create a new exercises
    for (const newExercise of data.exercises) {
      const existingExercise = existingExercises.find(
        exercise => exercise.name === newExercise.name
      );

      const ex = await db.exercise.upsert({
        where: {
          id: existingExercise?.id ?? '',
        },
        update: {
          ...newExercise,
        },
        create: {
          ...newExercise,
          workout: {
            connect: {
              id: workout.id,
            },
          },
        },
      });

      updatedExercises.push(ex);
    }

    // delete exercises that are not in the new exercises
    for (const existingExercise of existingExercises) {
      const isDeleted = data.exercises.every(
        exercise => exercise.name !== existingExercise.name
      );

      if (isDeleted) {
        await db.exercise.delete({
          where: {
            id: existingExercise.id,
          },
        });
      }
    }

    return {
      ...workout,
      exercises: updatedExercises,
    };
  } catch (error) {
    return {
      error: (error as PrismaClientValidationError).message,
    };
  }
};
