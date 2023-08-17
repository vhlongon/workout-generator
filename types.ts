import { Exercise, Mode, Target } from '@prisma/client';
import { ChangeEvent } from 'react';

export type FormProps<InitValues, SuccessData> = {
  initialValues: InitValues;
  onCompleted?: () => void;
  onError?: (error: string) => void;
  onSuccess?: (data: SuccessData) => void;
  onSubmitStart?: () => void;
  buttonText: string;
  title?: string;
};

type BaseFormData = {
  mode: Mode;
  target: Target;
  notes?: string | null;
  name?: string;
};
export type WorkoutFormData = BaseFormData & {
  exercises: Pick<Exercise, 'name' | 'sets' | 'reps'>[];
};

export type SuggestionFormData = BaseFormData & {
  totalSets: number;
};

export type CustomSelectProps = {
  onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  value: string;
};
