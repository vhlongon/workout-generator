import { getFavoriteWorkouts } from '@/actions/getFavouriteWorkoutsAction';
import { WorkoutCard } from '@/components/WorkoutCard';
import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export const FavouriteWorks = async () => {
  const favouriteWorkouts = await getFavoriteWorkouts();

  return (
    <>
      <div className="w-full max-w-lg text-center">
        <div className="divider mb-1"></div>
        <h3 className="text-lg tracking-wider font-accent text-secondary">
          Favourite workouts
        </h3>
        <div className="divider mt-1"></div>
      </div>
      {Boolean(favouriteWorkouts.length) ? (
        <div className="flex justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl w-full gap-2 mx-auto">
            {favouriteWorkouts.map(workout => {
              const { name } = workout;
              return (
                <li key={workout.id}>
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-200"
                  >
                    <input type="checkbox" />
                    <div className="flex gap-1 items-center collapse-title">
                      {name}
                    </div>
                    <div className="collapse-content">
                      <WorkoutCard
                        className="card-compact"
                        {...workout}
                        name={name}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <Link href="/create">
            <span className="btn btn-xs btn-accent">
              Create a favourite
              <PlusIcon className="w-4 h-4" />
            </span>
          </Link>
        </div>
      )}
    </>
  );
};
