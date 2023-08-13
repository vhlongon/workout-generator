'use client';
import { checkPassword } from '@/actions/checkPassword';
import { useId, useState, useTransition } from 'react';

export const ProtectForm = () => {
  const id = useId();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const action = (e: FormData) => {
    setError('');
    startTransition(async () => {
      try {
        const data = await checkPassword(e);
        if (data?.error) {
          setError(data.error);
        }
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };
  return (
    <form action={action} method="post" id={id}>
      <div className="flex flex-col">
        <label htmlFor="password">Enter password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          required
        />
      </div>
      {error && !isPending && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button type="submit" aria-busy={isPending} disabled={isPending}>
        {isPending ? 'Loading' : 'Submit'}
      </button>
    </form>
  );
};
