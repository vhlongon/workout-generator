import { toTitleCase } from '@/helpers/format';
import { db } from '@/prisma/client';

const getWorkouts = async () => {
  const workouts = await db.workout.findMany({
    include: {
      exercises: true,
    },
  });

  return workouts;
};
const WorkoutsPage = async () => {
  const workouts = await getWorkouts();

  return (
    <div className="w-full flex justify-center items-center">
      {workouts.length ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workouts.map(
            ({ name, mode, target, exercises, createdAt, updatedAt, id }) => {
              return (
                <li
                  className="flex flex-col border border-primary rounded-xl p-4"
                  key={id}
                >
                  <span></span>
                  <span>Name: {toTitleCase(name)}</span>
                  <span>Mode: {toTitleCase(mode)}</span>
                  <span>Target: {toTitleCase(target)}</span>
                  <span>
                    Created: {new Date(createdAt).toLocaleString('en-gb')}
                  </span>
                  {updatedAt !== createdAt && (
                    <span>
                      Updated:
                      {new Date(updatedAt).toLocaleString('en-gb')}
                    </span>
                  )}

                  {/* <span>Notes: {workout.notes}</span> */}
                  <span>Exercises:</span>
                  <ul className="flex flex-col gap-2">
                    {exercises.map(({ reps, sets, name, id: exerciseId }) => {
                      const repsValue =
                        reps.length === 1
                          ? reps[0]
                          : `${reps[0]}-${reps[reps.length - 1]}`;

                      return (
                        <li key={exerciseId}>
                          <span>
                            {toTitleCase(name)}, {repsValue} reps, {sets} sets
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <span>no workouts yet</span>
      )}
    </div>
  );
};

export default WorkoutsPage;
