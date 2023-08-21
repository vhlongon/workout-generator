import { getErrorMessage } from '@/helpers/format';
import { db } from '@/prisma/client';
import { currentUser } from '@clerk/nextjs';

export const getWorkoutAction = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: 'User not found',
    };
  }
  const email = user.emailAddresses[0].emailAddress;

  try {
    const workout = await db.workout.findUnique({
      where: {
        id,
        AND: {
          user: {
            email,
          },
        },
      },
      include: {
        exercises: true,
      },
    });

    if (!workout) {
      return {
        data: null,
      };
    }

    return { data: workout };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
