'use server';

import {
  generateWorkoutPrompt,
  getWorkoutSuggestion,
  parsePrompt,
} from '@/helpers/openai';
import { WorkoutSuggestionFormData } from '@/types';
import { currentUser } from '@clerk/nextjs';

export const generateSuggestionAction = async (
  input: WorkoutSuggestionFormData
) => {
  const authUser = await currentUser();

  try {
    if (!authUser) {
      return {
        error: 'Password is not valid',
      };
    }
    const prompt = generateWorkoutPrompt(input);
    const suggestion = await getWorkoutSuggestion(prompt);

    if (!suggestion) {
      return {
        error: 'No suggestion was generated',
      };
    }

    const parsedData = parsePrompt(suggestion);

    return parsedData;
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};
