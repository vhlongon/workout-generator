'use server';
import { db } from '@/prisma/client';
import { currentUser } from '@clerk/nextjs';

export const deleteWorkoutAction = async (id: string) => {
  try {
    const authUser = await currentUser();

    if (!authUser) {
      return {
        error: 'Password is not valid',
      };
    }

    await db.exercise.deleteMany({
      where: {
        workoutId: id,
      },
    });

    await db.workout.delete({
      where: {
        id,
      },
    });

    return { data: true };
  } catch (error) {
    console.log(error);
    return {
      error: (error as Error).message,
    };
  }
};
