'use client';
import { generateWorkoutSuggestion } from '@/actions/generateWorkoutSuggestion';
import { formatToTitleCase } from '@/helpers/toTitleCase';
import { WorkoutFormData, WorkoutSuggestionFormData } from '@/types';
import { Mode, Target } from '@prisma/client';
import React, {
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from 'react';
import { SaveWorkoutForm } from './SaveWorkoutForm';
import { ErrorMessage } from './ErrorMessage';
import { Select } from './Select';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const loadingPhrases = [
  'Pumping iron to generate your workout suggestion...',
  'Summoning the workout gods to create a workout just for you...',
  'Mixing up a special workout potion just for you...',
  'Activating our workout algorithm to create a workout that will make you feel like a superhero...',
  `Stretching our muscles to come up with a workout that's just right...`,
];

const getRandomLoadingPhrase = () => {
  return loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
};

export const SuggestWorkoutForm = () => {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const [suggestionFormData, setSuggestionFormData] =
    useState<WorkoutSuggestionFormData>({
      mode: Mode.HYPERTROPHY,
      target: Target.FULL_BODY,
      totalSets: 12,
    });
  const [workoutFormData, setWorkoutFormData] =
    useState<WorkoutFormData | null>();
  const id = useId();

  useEffect(() => {
    if (confirmation) {
      const timeoutId = setTimeout(() => {
        setConfirmation(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [confirmation]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSuggestionFormData({ ...suggestionFormData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setWorkoutFormData(null);
    startTransition(async () => {
      try {
        const data = await generateWorkoutSuggestion(suggestionFormData);

        if (!data) {
          setError('Something went wrong. Please try again later.');
          return;
        }

        if ('error' in data) {
          setError(data.error);
          return;
        }

        setWorkoutFormData({
          ...data,
          ...suggestionFormData,
        });
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  return (
    <div>
      <form
        className="max-w-md min-w-[300px] w-full flex flex-col gap-2"
        onSubmit={handleSubmit}
        id={id}
      >
        <div className="form-control">
          <label className="label text-sm text text-gray-400" htmlFor="mode">
            Mode
          </label>
          <Select
            onChange={handleInputChange}
            name="mode"
            id="mode"
            value={suggestionFormData.mode}
            options={Object.values(Mode).map(m => ({
              name: formatToTitleCase(m),
              value: m,
            }))}
          ></Select>
        </div>

        <div className="form-control">
          <label className="label text-sm text text-gray-400" htmlFor="target">
            Target
          </label>
          <Select
            onChange={handleInputChange}
            name="target"
            id="target"
            value={suggestionFormData.target}
            options={Object.values(Target).map(t => ({
              name: formatToTitleCase(t),
              value: t,
            }))}
          ></Select>
        </div>

        <div className="form-control">
          <label className="label text-sm text text-gray-400" htmlFor="target">
            Target
          </label>
          <input
            className="mx-auto input w-14 input-sm"
            type="number"
            name="totalSets"
            min={1}
            id="totalSets"
            required
            value={suggestionFormData.totalSets}
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
              <span>{error ? 'try again' : 'Suggest a workout'}</span>
            )}
          </button>
          {isPending && (
            <span className="text-xs text-center text-secondary w-[280px] mx-auto animate-pulse">
              {getRandomLoadingPhrase()}
            </span>
          )}
          {error && !isPending && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      </form>

      {workoutFormData && (
        <>
          <div className="my-4">
            <div className="divider"></div>
          </div>
          <SaveWorkoutForm
            data={workoutFormData}
            onSaved={() => {
              setConfirmation('Workout saved!');
              setWorkoutFormData(null);
            }}
          />
        </>
      )}
      {confirmation && (
        <div className="toaster mt-4 text-center">
          <div className="alert alert-info text-sm w-full">
            <CheckCircleIcon className="h-6 w-6" />
            <span>{confirmation}</span>
          </div>
        </div>
      )}
    </div>
  );
};
