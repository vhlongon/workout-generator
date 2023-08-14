'use client';
import { createWorkout } from '@/actions/createWorkout';
import { getMediumValue } from '@/helpers/medium';
import { deslugify, slugify } from '@/helpers/slugify';
import { formatToTitleCase } from '@/helpers/toTitleCase';
import { WorkoutFormData } from '@/types';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Mode, Target } from '@prisma/client';
import { useEffect, useId, useRef, useState, useTransition } from 'react';

export const CreateWorkoutForm = ({
  exercises,
  mode,
  target,
}: WorkoutFormData) => {
  const id = useId();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const [formData, setFormData] = useState<WorkoutFormData>({
    exercises,
    mode,
    target,
  });

  useEffect(() => {
    if (confirmation) {
      const timeoutId = setTimeout(() => {
        setConfirmation(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [confirmation]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      try {
        const data = await createWorkout(formData);

        if ('error' in data) {
          setError(data.error);
          return;
        }

        setConfirmation(`workout saved successfully!`);
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const [exerciseName, property] = name.split('_');

    if (name === 'mode' || name === 'target') {
      setFormData({ ...formData, [name]: value });
      return;
    }
    const updatedExercises = formData.exercises.map(exercise => {
      if (exercise.name.toLowerCase() === deslugify(exerciseName)) {
        return { ...exercise, [property]: [Number(value)] };
      }
      return exercise;
    });

    setFormData({ ...formData, exercises: updatedExercises });
  };

  return (
    <>
      <h2 className="text-lg font-accent tracking-widest text-accent">
        Create your own custom workout
      </h2>

      <form className="max-w-md" onSubmit={handleSubmit} id={id} ref={formRef}>
        <div className="flex flex-col gap-4">
          <table className="table" align="right">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sets</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise, index) => {
                const isSingleValue = exercise.reps.length === 1;
                const repsId = `${slugify(exercise.name)}_reps`;
                const setsId = `${slugify(exercise.name)}_sets`;
                const min = isSingleValue ? 6 : exercise.reps[0];
                const max = exercise.reps[exercise.reps.length - 1];
                const setsValue = formData.exercises[index].sets;
                const repsValue = getMediumValue(
                  formData.exercises[index].reps
                );

                return (
                  <tr key={exercise.name}>
                    <td className="px-1">
                      <input
                        className="input input-sm w-40 flex-grow"
                        type="text"
                        value={exercise.name}
                        onChange={handleInputChange}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="input w-14 input-sm"
                        type="number"
                        name={setsId}
                        min={1}
                        id={setsId}
                        required
                        value={setsValue}
                        onChange={handleInputChange}
                      />
                    </td>

                    <td>
                      <div className="flex justify-between px-2">
                        <span className="text-sm text-secondary">{min}</span>
                        <span className="text-sm text-secondary">{max}</span>
                      </div>
                      <input
                        className="range w-16"
                        type="range"
                        name={repsId}
                        min={min}
                        step={1}
                        id={repsId}
                        required
                        max={max}
                        value={repsValue}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between">
            <div className="form-control">
              <label
                className="label text-sm text text-gray-400"
                htmlFor="mode"
              >
                Mode
              </label>
              <select
                className="select select-sm"
                onChange={handleInputChange}
                name="mode"
                id="mode"
                value={formData.mode}
              >
                {Object.values(Mode).map(m => {
                  return (
                    <option key={m} value={m}>
                      {formatToTitleCase(m)}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-control">
              <label
                className="label text-sm text text-gray-400"
                htmlFor="target"
              >
                Target
              </label>
              <select
                className="select select-sm"
                onChange={handleInputChange}
                name="target"
                id="target"
                value={formData.target}
              >
                {Object.values(Target).map(t => {
                  return (
                    <option key={t} value={t}>
                      {formatToTitleCase(t)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 justify-center">
            <button
              className="btn btn-accent w-1/2 mx-auto mt-2"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Creating workout...' : 'Create workout'}
            </button>
            {error && !isPending && (
              <div className="alert alert-error">
                <details>
                  <summary className="flex gap-2 items-center cursor-pointer">
                    <XCircleIcon className="h-6 w-6" />
                    Something went wrong ▾
                  </summary>
                  <pre className="text-xs whitespace-pre-wrap">{error}</pre>
                </details>
              </div>
            )}
          </div>
        </div>
        {confirmation && (
          <div className="toaster mt-4 text-center">
            <div className="alert alert-info text-sm w-full">
              <CheckCircleIcon className="h-6 w-6" />
              <span>{confirmation}</span>
            </div>
          </div>
        )}
      </form>
    </>
  );
};
