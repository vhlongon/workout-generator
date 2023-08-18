'use client';
import { deleteWorkoutAction } from '@/actions/deleteWorkoutAction';
import { useSubmitAction } from '@/hooks/useSubmitAction';
import { MinusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ErrorMessage } from './ErrorMessage';

type ActionButtonsProps = {
  id: string;
};

export const ActionButtons = ({ id }: ActionButtonsProps) => {
  const { isPending, error, handleSubmit } = useSubmitAction({
    action: async () => deleteWorkoutAction(id),
  });

  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <Link href={`/workout/${id}`}>
          <span className="btn btn-xs btn-success">
            Edit
            <PencilSquareIcon className="w-4 h-4" title="Edit" />
          </span>
        </Link>
        <form action={handleSubmit}>
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

      <ErrorMessage show={!isPending}>{error}</ErrorMessage>
    </div>
  );
};
