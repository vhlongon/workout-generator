import { Exercise, Mode, Target } from '@prisma/client';

export type FormProps<InitValues, SuccessData> = {
  initialValues: InitValues;
  onCompleted?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (data: SuccessData) => void;
  onSubmitStart?: () => void;
  buttonText: string;
};

type BaseFormData = {
  mode: Mode;
  target: Target;
  notes?: string | null;
  title?: string;
};
export type WorkoutFormData = BaseFormData & {
  exercises: Pick<Exercise, 'name' | 'sets' | 'reps'>[];
};

export type SuggestionFormData = BaseFormData & {
  totalSets: number;
};
