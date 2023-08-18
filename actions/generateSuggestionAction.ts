'use server';

import { getUserNameOrId, isWorkoutNameUnique } from '@/helpers/data';
import { getWorkoutSuggestion } from '@/helpers/prompt';
import { SuggestionFormData } from '@/types';
import { currentUser } from '@clerk/nextjs';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const generateSuggestionAction = async (
  input: SuggestionFormData,
  mock = false
) => {
  try {
    const authUser = await currentUser();
    if (!authUser) {
      return {
        error: 'Password is not valid',
      };
    }

    const username = getUserNameOrId(authUser);

    const workoutIsUnique = await isWorkoutNameUnique(username, input.name);

    if (!workoutIsUnique) {
      return {
        error: 'Workout name already exists',
      };
    }

    if (mock) {
      await sleep(1000);
      return {
        data: {
          exercises: [
            { name: 'Barbell Squats', sets: 3, reps: [2] },
            { name: 'Deadlifts', sets: 3, reps: [2] },
            { name: 'Bench Press', sets: 3, reps: [2] },
            { name: 'Bent-Over Rows', sets: 3, reps: [2] },
            { name: 'Shoulder Press', sets: 3, reps: [2] },
            { name: 'Bicep Curls', sets: 3, reps: [2] },
            { name: 'Tricep Dips', sets: 3, reps: [2] },
            { name: 'Calf Raises', sets: 3, reps: [2] },
          ],
          notes: 'some notes',
        },
      };
    }

    const suggestion = await getWorkoutSuggestion(input);

    if (!suggestion) {
      return {
        error: 'No suggestion was generated',
      };
    }

    return { data: suggestion };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};
