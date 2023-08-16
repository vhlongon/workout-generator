import { Exercise, Mode, Target } from '@prisma/client';

export type FormProps<InitValues, SuccessData> = {
  initialValues: InitValues;
  onCompleted?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (data: SuccessData) => void;
  onSubmitStart?: () => void;
  buttonText: string;
};

export type WorkoutFormData = {
  exercises: Pick<Exercise, 'name' | 'sets' | 'reps'>[];
  mode: Mode;
  target: Target;
  notes?: string | null;
};

export type SuggestionFormData = {
  mode: Mode;
  target: Target;
  totalSets: number;
  notes?: string | null;
};
