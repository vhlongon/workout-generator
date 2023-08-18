import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const getFadeInClass = (isLoading: boolean) =>
  twMerge(
    'transition-all duration-300',
    isLoading ? 'opacity-100 h-auto' : 'opacity-0 h-0'
  );

export const ErrorMessage = ({
  children,
  className,
  show = true,
}: {
  children: ReactNode;
  className?: string;
  show?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        'transition-all duration-300',
        getFadeInClass(Boolean(children && show))
      )}
    >
      <div
        className={twMerge('alert alert-error whitespace-normal', className)}
      >
        <details>
          <summary className="flex gap-2 items-center cursor-pointer">
            <XCircleIcon className="h-6 w-6" />
            Something went wrong ▾
          </summary>
          <pre className="text-xs whitespace-pre-wrap max-w-sm break-words">
            {children}
          </pre>
        </details>
      </div>
    </div>
  );
};
