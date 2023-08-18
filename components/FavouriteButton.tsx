'use client';
import { toggleFavouriteAction } from '@/actions/toggleFavouriteAction';
import { useSubmitAction } from '@/hooks/useSubmitAction';
import {
  PlusCircleIcon,
  StarIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

type FavouriteButtonProps = {
  isFavourite: boolean;
  id: string;
};

export const FavouriteButton = ({ isFavourite, id }: FavouriteButtonProps) => {
  const { isPending, error, handleSubmit } = useSubmitAction({
    action: async () => toggleFavouriteAction(id, isFavourite),
  });

  return (
    <form className="flex items-center gap-1" action={handleSubmit}>
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
