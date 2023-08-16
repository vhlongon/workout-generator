'use client';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SuggestionForm } from '@/app/create/SuggestionForm';
import { WorkoutForm } from './WorkoutForm';
import { SuggestionFormData, WorkoutFormData } from '@/types';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Mode, Target } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const getFadeInClass = (isLoading: boolean) => {
  return twMerge(
    'transition-all duration-300',
    isLoading ? 'opacity-100 h-auto' : 'opacity-0 h-0'
  );
};

export const CreateWorkoutFlow = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [suggestionFormData, setSuggestionFormData] =
    useState<SuggestionFormData>({
      mode: Mode.HYPERTROPHY,
      target: Target.FULL_BODY,
      totalSets: 12,
    });
  const [workoutFormData, setWorkoutFormData] =
    useState<WorkoutFormData | null>();

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

  const onSuggestionStart = () => {
    setIsLoading(true);
    setError('');
    setWorkoutFormData(null);
  };

  const onSaveStart = () => {
    setIsLoading(true);
    setError('');
  };

  const onCompleted = () => {
    setIsLoading(false);
  };

  const onSuggestionSuccess = (data: WorkoutFormData) => {
    setWorkoutFormData(data);
  };

  const onSaveWorkoutSuccess = () => {
    setConfirmation('Workout saved!');
    setWorkoutFormData(null);
  };

  return (
    <div>
      <SuggestionForm
        initialValues={suggestionFormData}
        onSubmitStart={onSuggestionStart}
        onError={setError}
        onSuccess={onSuggestionSuccess}
        onCompleted={onCompleted}
        buttonText={workoutFormData ? 'Try a new one' : 'Suggest'}
      />

      {workoutFormData && (
        <>
          <div className="my-4">
            <div className="divider"></div>
          </div>
          <WorkoutForm
            initialValues={workoutFormData}
            onSubmitStart={onSaveStart}
            onError={setError}
            onSuccess={onSaveWorkoutSuccess}
            onCompleted={onCompleted}
            buttonText="Save workout"
          />
        </>
      )}

      <div className="flex flex-col gap-2 mt-2">
        <div
          className={twMerge(
            'transition-all duration-300',
            getFadeInClass(Boolean(error && !isLoading))
          )}
        >
          <ErrorMessage>{error}</ErrorMessage>
        </div>
        <div
          className={twMerge(
            'toaster text-center transition-all duration-300',
            getFadeInClass(Boolean(confirmation))
          )}
        >
          <div className="alert alert-info text-sm w-full">
            <CheckCircleIcon className="h-6 w-6" />
            <span>{confirmation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
