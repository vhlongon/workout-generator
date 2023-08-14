'use client';
import { createWorkout } from '@/actions/createWorkout';
import { getMediumValue } from '@/helpers/medium';
import { slugify } from '@/helpers/slugify';
import { formatToTitleCase } from '@/helpers/toTitleCase';
import { WorkoutFormData } from '@/types';
import { Mode, Target } from '@prisma/client';
import { useId, useRef, useState, useTransition } from 'react';

export const CreateWorkoutForm = ({
  exercises,
  mode,
  target,
}: WorkoutFormData) => {
  const id = useId();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<WorkoutFormData>({
    exercises,
    mode,
    target,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      try {
        const data = await createWorkout(formData);

        if (data?.error) {
          setError(data.error);
        }
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const [exerciseName, property] = name.split('-');

    if (name === 'mode' || name === 'target') {
      setFormData({ ...formData, [name]: value });
      return;
    }
    const index = exercises.findIndex(
      exercise => exercise.name === exerciseName
    );
    const updatedExercise = { ...formData.exercises[index], [property]: value };
    const updatedExercises = [...formData.exercises];
    updatedExercises[index] = updatedExercise;
    setFormData({ ...formData, exercises: updatedExercises });
  };
  return (
    <form onSubmit={handleSubmit} id={id} ref={formRef}>
      <div className="flex flex-col gap-4">
        <table className="table" align="right">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            {formData.exercises.map((exercise, index) => {
              const repsId = `${slugify(exercise.name)}-reps`;
              const setsId = `${slugify(exercise.name)}-sets`;
              const min = exercise.reps[0];
              const max = exercise.reps[exercise.reps.length - 1];
              const medium = getMediumValue(exercise.reps);
              const isSingleValue = exercise.reps.length === 1;
              return (
                <tr key={exercise.name}>
                  <th>{index + 1}</th>
                  <td>
                    <p className="font-bold flex-grow">{exercise.name}</p>
                  </td>
                  <td>
                    <input
                      className="input w-20 input-sm"
                      type="number"
                      name={setsId}
                      id={setsId}
                      required
                      value={exercise.sets}
                      onChange={handleInputChange}
                    />
                  </td>

                  <td>
                    {isSingleValue ? (
                      <div>
                        <input
                          className="input w-20 input-sm"
                          type="number"
                          name={repsId}
                          id={repsId}
                          required
                          value={medium}
                          onChange={handleInputChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">{min}</span>
                          <span className="text-sm text-secondary">{max}</span>
                        </div>
                        <input
                          className="range input-"
                          type="range"
                          name={repsId}
                          min={min}
                          step={1}
                          id={repsId}
                          required
                          max={max}
                          value={medium}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between">
          <div className="form-control">
            <label className="label text-sm text text-gray-400" htmlFor="mode">
              Mode
            </label>
            <select
              className="select select-sm"
              onChange={handleInputChange}
              name="mode"
              id="mode"
            >
              {Object.values(Mode).map(m => {
                return (
                  <option key={m} selected={mode === m} value={m}>
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
            >
              {Object.values(Target).map(t => {
                return (
                  <option key={t} selected={target === t} value={t}>
                    {formatToTitleCase(t)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex w-full justify-center">
          {error && !isPending && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-accent" type="submit" disabled={isPending}>
            {isPending ? 'Creating workout...' : 'Create workout'}
          </button>
        </div>
      </div>
    </form>
  );
};
