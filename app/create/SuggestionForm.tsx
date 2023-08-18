'use client';
import { generateSuggestionAction } from '@/actions/generateSuggestionAction';
import { ConfirmationToast } from '@/components/ConfirmationToast';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ModeSelect } from '@/components/ModeSelect';
import { TargetSelect } from '@/components/TargetSelect';
import { getRandomLoadingPhrase } from '@/helpers/value';
import { useConfirmationState } from '@/hooks/useConfirmationState';
import { FormProps, SuggestionFormData } from '@/types';
import { Mode, Target } from '@prisma/client';
import { useId, useRef, useTransition } from 'react';
import { WorkoutForm } from './WorkoutForm';

export type WorkoutFormProps = FormProps<SuggestionFormData>;

export const SuggestionForm = ({
  initialValues,
  buttonText,
  title,
}: WorkoutFormProps) => {
  const id = useId();
  const [isPending, startTransition] = useTransition();
  const {
    error,
    setError,
    setWorkoutFormData,
    workoutFormData,
    setConfirmation,
    confirmation,
  } = useConfirmationState();
  const formRef = useRef<HTMLFormElement>(null);

  const suggestAction = (data: FormData) => {
    setWorkoutFormData(null);
    setError('');
    startTransition(async () => {
      try {
        const formData = {
          mode: data.get('mode') as Mode,
          target: data.get('target') as Target,
          totalSets: Number(data.get('totalSets')),
          name: data.get('name') as string,
        };

        const res = await generateSuggestionAction(formData);

        if (res.error) {
          setError?.(res.error);
          return;
        }

        if (!res.data) {
          setError?.('No data returned');
          return;
        }

        setWorkoutFormData({ ...res.data, ...formData });
      } catch (error) {
        setError?.((error as Error).message);
      }
    });
  };

  return (
    <div className="max-w-sm">
      <p className="text-lg font-accent tracking-widest text-accent text-center mb-2">
        {title}
      </p>

      <form
        className="max-w-md min-w-[300px] w-full flex flex-col gap-2"
        action={suggestAction}
        id={id}
        ref={formRef}
      >
        <div className="form-control">
          <label className="label text-sm text-gray-400" htmlFor="name">
            Give a unique name to your workout
          </label>
          <input
            className="input input-sm input-bordered"
            type="text"
            name="name"
            id="name"
            required
            placeholder="Something cool, like Bone crusher..."
          />
          <label className="label">
            <span className="label-text-alt text-gray-400">
              Make sure you dont have a workout with the same name already
            </span>
          </label>
        </div>

        <div className="flex gap-4 w-full justify-between">
          <ModeSelect defaultValue={initialValues.mode} />
          <TargetSelect defaultValue={initialValues.target} />
          <div className="form-control">
            <label
              className="label text-sm text text-gray-400"
              htmlFor="target"
            >
              Sets
            </label>
            <input
              className="input w-16 input-sm input-bordered"
              type="number"
              name="totalSets"
              min={1}
              id="totalSets"
              required
              defaultValue={initialValues.totalSets}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 justify-center">
          <button
            className="btn btn-accent btn-sm mx-auto mt-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              <span>{workoutFormData ? 'Try a new one' : buttonText}</span>
            )}
          </button>
          {isPending && (
            <span className="text-xs text-center text-secondary w-[280px] mx-auto animate-pulse">
              {getRandomLoadingPhrase()}
            </span>
          )}
          <ErrorMessage show={!isPending}>{error}</ErrorMessage>
        </div>
      </form>

      {!isPending && workoutFormData && !error && (
        <>
          <div className="my-4">
            <div className="divider"></div>
          </div>
          <WorkoutForm
            initialValues={workoutFormData}
            title="Customize or save your workout as is"
            buttonText="Save Workout"
            onSuccess={() => {
              setWorkoutFormData(null);
              formRef.current?.reset();
              setConfirmation('Workout saved');
            }}
          />
        </>
      )}

      <div className="mt-4">
        <ConfirmationToast text={confirmation} />
      </div>
    </div>
  );
};
