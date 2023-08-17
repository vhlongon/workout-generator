'use client';
import { WorkoutForm, WorkoutFormProps } from '@/app/create/WorkoutForm';
import { ErrorMessage } from '@/components/ErrorMessage';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const UpdateWorkoutFlow = (props: WorkoutFormProps) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (confirmation) {
      const timeoutId = setTimeout(() => {
        setConfirmation(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [confirmation]);

  const onSubmitStart = () => {
    setIsLoading(true);
    setError('');
  };

  const onSuccess = () => {
    setConfirmation('Workout saved!');
    router.refresh();
  };

  const onCompleted = () => {
    setIsLoading(false);
  };

  const getFadeInClass = (isLoading: boolean) =>
    twMerge(
      'transition-all duration-300',
      isLoading ? 'opacity-100 h-auto' : 'opacity-0 h-0'
    );

  return (
    <>
      <WorkoutForm
        {...props}
        onSuccess={onSuccess}
        onSubmitStart={onSubmitStart}
        onError={setError}
        onCompleted={onCompleted}
      />
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
    </>
  );
};

export default UpdateWorkoutFlow;
