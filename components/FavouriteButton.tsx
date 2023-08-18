'use client';
import { toggleFavouriteAction } from '@/actions/toggleFavouriteAction';
import {
  PlusCircleIcon,
  StarIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';

type FavouriteButtonProps = {
  isFavourite: boolean;
  id: string;
};

export const FavouriteButton = ({ isFavourite, id }: FavouriteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const data = await toggleFavouriteAction(id, isFavourite);

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
    <form className="flex items-center gap-1" onSubmit={handleSubmit}>
      {error ? (
        <>
          {!isPending && <span className="text-error">try again</span>}
          <button
            type="submit"
            className={twMerge(
              'btn btn-circle btn-ghost btn-sm cursor-pointer',
              isPending ? 'loading' : ''
            )}
          >
            <XCircleIcon className="w-6 h-6 text-error" title="Re-run" />
          </button>
        </>
      ) : (
        <>
          {!isPending && (
            <span className="text-gray-400">
              {isFavourite ? 'Remove' : 'Add'}
            </span>
          )}
          <button
            type="submit"
            className={twMerge(
              'btn btn-circle btn-ghost btn-sm cursor-pointer',
              isPending ? 'loading' : ''
            )}
          >
            {isFavourite ? (
              <StarIcon className="w-6 h-6" title="Remove from favourites" />
            ) : (
              <PlusCircleIcon className="w-6 h-6" title="Add to favourites" />
            )}
          </button>
        </>
      )}
    </form>
  );
};
