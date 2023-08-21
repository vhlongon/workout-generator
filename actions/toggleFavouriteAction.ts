'use server';

import { getErrorMessage } from '@/helpers/format';
import { db } from '@/prisma/client';

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

    return { data: true };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
