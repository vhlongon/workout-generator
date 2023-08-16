'use client';
import { checkPasswordAction } from '@/actions/checkPasswordAction';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useId, useState, useTransition } from 'react';

export const ProtectForm = () => {
  const id = useId();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const action = (e: FormData) => {
    setError('');
    startTransition(async () => {
      try {
        const data = await checkPasswordAction(e);
        if (data?.error) {
          setError(data.error);
        }
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };
  return (
    <form action={action} className="flex flex-col gap-4" id={id}>
      <div className="form-control w-full max-w-xs">
        <input
          type="password"
          name="password"
          id="password"
          className="input input-bordered w-full max-w-xs"
          placeholder="Enter password"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-accent"
        aria-busy={isPending}
        disabled={isPending}
      >
        {isPending ? 'Loading' : 'Submit'}
      </button>
      {error && !isPending && (
        <div className="alert alert-error">
          <XCircleIcon className="h-6 w-6" />
          <pre className="text-xs whitespace-pre-wrap">{error}</pre>
        </div>
      )}
    </form>
  );
};
