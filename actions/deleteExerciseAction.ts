'use server';
import { getErrorMessage } from '@/helpers/format';
import { db } from '@/prisma/client';

export const deleteExerciseAction = async (id: string) => {
  try {
    const exercise = await db.exercise.delete({
      where: {
        id,
      },
    });

    return {
      data: exercise,
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
