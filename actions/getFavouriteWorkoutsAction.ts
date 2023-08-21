import { getErrorMessage } from '@/helpers/format';
import { db } from '@/prisma/client';
import { currentUser } from '@clerk/nextjs';

export const getFavoriteWorkouts = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        error: 'User not found',
      };
    }

    const email = user.emailAddresses[0].emailAddress;

    const workouts = await db.workout.findMany({
      include: {
        exercises: true,
      },
      where: {
        isFavourite: true,
        user: {
          email,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { data: workouts };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
