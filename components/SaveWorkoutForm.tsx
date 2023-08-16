'use client';
import { createWorkout } from '@/actions/createWorkout';
import { getMediumValue } from '@/helpers/medium';
import { deslugify, slugify } from '@/helpers/slugify';
import { formatToTitleCase } from '@/helpers/toTitleCase';
import { WorkoutFormData } from '@/types';
import { Mode, Target } from '@prisma/client';
import { useId, useState, useTransition } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { Select } from './Select';

type SaveWorkoutData = {
  data: WorkoutFormData;
  onSaved?: () => void;
};
export const SaveWorkoutForm = ({ data, onSaved }: SaveWorkoutData) => {
  const id = useId();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<WorkoutFormData>(data);

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

        onSaved?.();
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const [exerciseName, property] = name.split('_');

    if (name === 'mode' || name === 'target' || name === 'notes') {
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
      <h2 className="text-lg font-accent tracking-widest text-accent text-center mb-2">
        Customize your workout
      </h2>

      <form className="max-w-md" onSubmit={handleSubmit} id={id}>
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
              {data.exercises.map((exercise, index) => {
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
                    <td>
                      <span className="w-40 flex-grow">{exercise.name}</span>
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
              <Select
                onChange={handleInputChange}
                name="mode"
                id="mode"
                value={formData.mode}
                options={Object.values(Mode).map(m => ({
                  name: formatToTitleCase(m),
                  value: m,
                }))}
              ></Select>
            </div>

            <div className="form-control">
              <label
                className="label text-sm text text-gray-400"
                htmlFor="target"
              >
                Target
              </label>
              <Select
                onChange={handleInputChange}
                name="target"
                id="target"
                value={formData.target}
                options={Object.values(Target).map(t => ({
                  name: formatToTitleCase(t),
                  value: t,
                }))}
              ></Select>
            </div>
          </div>
          <div className="form-control">
            <label className="label text-sm text text-gray-400" htmlFor="name">
              Notes
            </label>
            <textarea
              className="textarea w-full min-h-[100px]"
              name="notes"
              id="notes"
              placeholder="add some notes"
              value={formData.notes}
              onChange={handleInputChange}
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
                <span>Save workout</span>
              )}
            </button>
            {isPending && (
              <span className="text-xs text-center text-secondary">
                Saving workout...
              </span>
            )}
            {error && !isPending && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
      </form>
    </>
  );
};
