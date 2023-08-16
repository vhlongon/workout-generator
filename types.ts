import { Exercise, Mode, Target } from '@prisma/client';

export type WorkoutFormData = {
  exercises: Pick<Exercise, 'name' | 'sets' | 'reps'>[];
  mode: Mode;
  target: Target;
  notes?: string;
};

export type WorkoutSuggestionFormData = {
  mode: Mode;
  target: Target;
  totalSets: number;
  notes?: string;
};
