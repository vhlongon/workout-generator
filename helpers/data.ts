import { db } from '@/prisma/client';
import { User } from '@clerk/nextjs/server';

export const getUserNameOrId = (user: User) => {
  if (user.username) {
    return user.username;
  }

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName) {
    return user.firstName;
  }

  return user.id;
};

export const isWorkoutNameUnique = async (
  username: string,
  workoutName?: string
) => {
  if (!workoutName) return false;

  const existingworkout = await db.workout.findFirst({
    where: {
      user: {
        name: username,
      },
      AND: {
        name: workoutName,
      },
    },
  });

  return Boolean(!existingworkout);
};
