'use server';

import { WorkoutFormData } from '@/types';
import { currentUser } from '@clerk/nextjs';

export const createWorkout = async (data: WorkoutFormData) => {
  const authUser = await currentUser();

  if (!authUser) {
    return {
      error: 'Password is not valid',
    };
  }

  console.log(data);
};
