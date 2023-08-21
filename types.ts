import { Mode, Target } from '@prisma/client';

export type FormProps<InitValues> = {
  initialValues: InitValues;
  buttonText?: string;
  title?: string;
  onSuccess?: () => void;
};

export type BaseFormData = {
  mode: Mode;
  target: Target;
  notes?: string | null;
  name?: string;
};

export type ExerciseInput = {
  name: string;
  sets: number;
  reps: number[];
  id?: string;
};
export type WorkoutFormData = BaseFormData & {
  exercises: ExerciseInput[];
};

export type SuggestionFormData = BaseFormData & {
  totalSets: number;
};

export type CustomSelectProps = {
  defaultValue: string;
};

export type FormMode = 'create' | 'update';
