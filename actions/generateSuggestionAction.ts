'use server';

import { getWorkoutSuggestion } from '@/helpers/prompt';
import { SuggestionFormData } from '@/types';
import { currentUser } from '@clerk/nextjs';

export const generateSuggestionAction = async (input: SuggestionFormData) => {
  const authUser = await currentUser();

  try {
    if (!authUser) {
      return {
        error: 'Password is not valid',
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
