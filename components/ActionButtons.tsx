'use client';
import { deleteWorkoutAction } from '@/actions/deleteWorkoutAction';
import { MinusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';
import { ErrorMessage } from './ErrorMessage';

type ActionButtonsProps = {
  id: string;
};

export const ActionButtons = ({ id }: ActionButtonsProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const data = await deleteWorkoutAction(id);

        if (data?.error) {
          setError(data.error);
          return;
        }
        router.refresh();
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <Link href={`/workout/${id}`}>
          <span className="btn btn-xs btn-success">
            Edit
            <PencilSquareIcon className="w-4 h-4" title="Edit" />
          </span>
        </Link>
        <form onSubmit={handleDelete}>
          <button
            className={twMerge(
              'btn btn-xs btn-error',
              isPending ? 'loading' : ''
            )}
            type="submit"
          >
            Delete
            <MinusCircleIcon className="w-4 h-4" title="Remove" />
          </button>
        </form>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
