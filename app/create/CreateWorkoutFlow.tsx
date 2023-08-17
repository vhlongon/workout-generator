'use client';
import { SuggestionForm } from '@/app/create/SuggestionForm';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useConfirmationState } from '@/hooks/useConfirmationState';
import { WorkoutFormData } from '@/types';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Mode, Target } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { WorkoutForm } from './WorkoutForm';

export const CreateWorkoutFlow = () => {
  const {
    confirmation,
    error,
    isLoading,
    setConfirmation,
    setError,
    setIsLoading,
  } = useConfirmationState();
  const initialSuggestionData = {
    mode: Mode.HYPERTROPHY,
    target: Target.FULL_BODY,
    totalSets: 12,
  };
  const [workoutFormData, setWorkoutFormData] =
    useState<WorkoutFormData | null>();
  const router = useRouter();

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
    router.refresh();
  };

  const getFadeInClass = (isLoading: boolean) =>
    twMerge(
      'transition-all duration-300',
      isLoading ? 'opacity-100 h-auto' : 'opacity-0 h-0'
    );

  return (
    <div>
      <SuggestionForm
        initialValues={initialSuggestionData}
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
            title="Customize or save your workout as is"
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
          <div className="alert alert-info text-sm flex justify-center">
            <CheckCircleIcon className="h-6 w-6" />
            <span>{confirmation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
