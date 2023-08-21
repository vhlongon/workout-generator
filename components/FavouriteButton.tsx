'use client';
import { toggleFavouriteAction } from '@/actions/toggleFavouriteAction';
import { useSubmitAction } from '@/hooks/useSubmitAction';
import {
  PlusCircleIcon,
  StarIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { experimental_useOptimistic as useOptimistic } from 'react';
import { twMerge } from 'tailwind-merge';

type FavouriteButtonProps = {
  isFavourite: boolean;
  id: string;
};

export const FavouriteButton = ({ isFavourite, id }: FavouriteButtonProps) => {
  const [optimisticFavourite, addOptimisticFavourite] = useOptimistic(
    isFavourite,
    state => !state
  );

  const { isPending, error, handleSubmit } = useSubmitAction({
    action: async () => {
      addOptimisticFavourite(true);
      return toggleFavouriteAction(id, isFavourite);
    },
  });

  return (
    <form className="flex items-center gap-1" action={handleSubmit}>
      {error ? (
        <>
          {!isPending && <span className="text-error">try again</span>}
          <button
            type="submit"
            disabled={isPending}
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
          <span className="text-gray-400">
            {optimisticFavourite ? 'Remove' : 'Add'}
          </span>

          <button
            type="submit"
            disabled={isPending}
            className={twMerge(
              'btn btn-circle btn-ghost btn-sm cursor-pointer'
            )}
          >
            {optimisticFavourite ? (
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
