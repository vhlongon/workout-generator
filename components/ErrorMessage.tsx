import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { ReactNode } from 'react';

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="alert alert-error whitespace-normal">
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
  );
};
