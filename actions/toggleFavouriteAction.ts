'use server';

import { db } from '@/prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

export const toggleFavouriteAction = async (
  id: string,
  isFavourite: boolean
) => {
  try {
    const workout = await db.workout.findUnique({
      where: {
        id,
      },
    });

    if (!workout) {
      return {
        error: 'Workout not found',
      };
    }

    await db.workout.update({
      where: {
        id,
      },
      data: {
        isFavourite: !isFavourite,
      },
    });

    return true;
  } catch (error) {
    return {
      error: (error as PrismaClientValidationError).message,
    };
  }
};
