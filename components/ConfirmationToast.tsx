import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

type ConfirmationProps = {
  text?: string | null;
};

const getFadeInClass = (isLoading: boolean) =>
  twMerge(
    'transition-all duration-300',
    isLoading ? 'opacity-100 h-auto' : 'opacity-0 h-0'
  );

export const ConfirmationToast = ({ text }: ConfirmationProps) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div
        className={twMerge(
          'toaster text-center transition-all duration-300',
          getFadeInClass(Boolean(text))
        )}
      >
        <div className="alert alert-info text-sm flex justify-center">
          <CheckCircleIcon className="h-6 w-6" />
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
