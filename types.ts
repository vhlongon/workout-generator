import { Exercise, Mode, Target } from '@prisma/client';

export type FormProps<InitValues> = {
  initialValues: InitValues;
  buttonText?: string;
  title?: string;
  onSuccess?: () => void;
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
  defaultValue: string;
};
