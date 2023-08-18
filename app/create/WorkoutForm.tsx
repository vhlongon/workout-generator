'use client';
import { saveWorkoutAction } from '@/actions/saveWorkoutAction';
import { ConfirmationToast } from '@/components/ConfirmationToast';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ModeSelect } from '@/components/ModeSelect';
import { TargetSelect } from '@/components/TargetSelect';
import { slugify } from '@/helpers/format';
import { getMediumValue } from '@/helpers/value';
import { useConfirmationState } from '@/hooks/useConfirmationState';
import { FormProps, WorkoutFormData } from '@/types';
import { Mode, Target } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useId, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';

export type WorkoutFormProps = FormProps<WorkoutFormData>;

export const WorkoutForm = ({
  initialValues,
  title,
  buttonText,
  onSuccess,
}: WorkoutFormProps) => {
  const id = useId();
  const [isPending, startTransition] = useTransition();
  const { error, setError, confirmation, setConfirmation } =
    useConfirmationState();
  const router = useRouter();

  const saveWorkout = (e: FormData) => {
    startTransition(async () => {
      try {
        setError('');
        const formData = {
          name: initialValues.name,
          mode: e.get('mode') as Mode,
          target: e.get('target') as Target,
          notes: e.get('notes') as string,
          exercises: initialValues.exercises.map((exercise, index) => ({
            name: exercise.name,
            sets: Number(e.get(`${slugify(exercise.name)}_sets`)),
            reps: [Number(e.get(`${slugify(exercise.name)}_reps`)) || 0],
          })),
        };

        const data = await saveWorkoutAction(formData);

        if (data.error) {
          setError?.(data.error);
          return;
        }

        if (!data.data) {
          setError?.('No data returned');
          return;
        }

        setConfirmation('Workout saved!');
        onSuccess?.();
        router.refresh();
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

      <form action={saveWorkout} id={id}>
        <div className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label text-sm text text-gray-400" htmlFor="name">
              Name
            </label>
            <input
              className="input input-sm input-bordered w-full disabled:bg-base-100"
              name="name"
              id="name"
              type="text"
              required
              disabled
              defaultValue={initialValues.name}
            />
          </div>
          <table className="table" align="right">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sets</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {initialValues.exercises.map((exercise, index) => {
                const repsId = `${slugify(exercise.name)}_reps`;
                const setsId = `${slugify(exercise.name)}_sets`;
                const min = exercise.reps[0];
                const max = exercise.reps[exercise.reps.length - 1];
                const isRange = min !== max;

                return (
                  <tr key={exercise.name}>
                    <td>
                      <span className="w-40 flex-grow">{exercise.name}</span>
                    </td>
                    <td>
                      <input
                        className="input w-16 input-sm input-bordered"
                        type="number"
                        name={setsId}
                        min={1}
                        id={setsId}
                        required
                        defaultValue={initialValues.exercises[index].sets}
                      />
                    </td>

                    <td>
                      {isRange && (
                        <div className="flex justify-between px-2">
                          <span className="text-sm text-secondary">{min}</span>
                          <span className="text-sm text-secondary">{max}</span>
                        </div>
                      )}
                      <input
                        className={twMerge(
                          `${
                            isRange
                              ? `range max-w-[60px]`
                              : 'input w-16 input-sm input-bordered'
                          }`
                        )}
                        type={isRange ? 'range' : 'number'}
                        name={repsId}
                        min={isRange ? min : 1}
                        step={1}
                        id={repsId}
                        required
                        max={isRange ? max : 20}
                        defaultValue={getMediumValue(
                          initialValues.exercises[index].reps
                        )}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between">
            <ModeSelect defaultValue={initialValues.mode} />
            <TargetSelect defaultValue={initialValues.target} />
          </div>
          <div className="form-control">
            <label className="label text-sm text text-gray-400" htmlFor="notes">
              Notes
            </label>
            <textarea
              className="textarea textarea-bordered w-full min-h-[100px]"
              name="notes"
              id="notes"
              placeholder="add some notes"
              defaultValue={initialValues.notes ?? ''}
            />
          </div>

          <div className="flex w-full flex-col gap-2 justify-center">
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
                <span>{buttonText}</span>
              )}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4">
        <ErrorMessage show={!isPending}>{error}</ErrorMessage>

        <ConfirmationToast text={confirmation} />
      </div>
    </div>
  );
};
