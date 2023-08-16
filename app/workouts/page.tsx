import { WorkoutCard } from '@/components/WorkoutCard';
import { getWorkoutName } from '@/helpers/value';
import { db } from '@/prisma/client';
import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export const revalidate = 0;

const getWorkouts = async () => {
  const workouts = await db.workout.findMany({
    include: {
      exercises: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return workouts;
};

const WorkoutsPage = async () => {
  const workouts = await getWorkouts();

  return (
    <div className="w-full max-w-7xl mx-auto flex justify-center items-center">
      {workouts.length ? (
        <div className="flex flex-col gap-4">
          <Link href="/create">
            <span className="inline-flex items-center btn btn-sm btn-accent">
              Create workout
              <PlusIcon className="w-4 h-4" />
            </span>
          </Link>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-col-4 gap-4">
            {workouts.map(workout => (
              <li key={workout.id}>
                <WorkoutCard {...workout} name={getWorkoutName(workout.name)} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          No workouts yet
          <Link href="/create">
            <span className="btn btn-sm btn-accent">Create one</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
