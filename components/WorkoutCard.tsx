import { formatDate, toTitleCase } from '@/helpers/format';
import {
  BeakerIcon,
  BoltIcon,
  DocumentTextIcon,
  ListBulletIcon,
  TagIcon,
} from '@heroicons/react/24/solid';
import { Exercise, Workout } from '@prisma/client';

type CardProps = Workout & {
  exercises: Exercise[];
};
export const WorkoutCard = ({
  createdAt,
  id,
  mode,
  name,
  notes,
  target,
  exercises,
}: CardProps) => {
  return (
    <div className="card bg-neutral h-full border border-primary shadow-xl">
      <div className="card-body">
        <span className="flex gap-1 items-center text-info">
          <TagIcon className="w-4 h-4" />
          <span className="text-xs">{formatDate(createdAt)}</span>
        </span>

        <h3 className="card-title">{toTitleCase(name)}</h3>
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-100"
        >
          <input type="checkbox" />
          <div className="flex gap-1 items-center collapse-title">
            <ListBulletIcon className="w-4 h-4" /> Exercises
          </div>
          <div className="collapse-content">
            <ul className="flex flex-1 flex-col gap-2 pl-2">
              {exercises.map(({ reps, sets, name, id: exerciseId }) => {
                const repsValue =
                  reps.length === 1
                    ? reps[0]
                    : `${reps[0]}-${reps[reps.length - 1]}`;

                return (
                  <li className="text-sm" key={exerciseId}>
                    <span>
                      {toTitleCase(name)}, {repsValue} reps, {sets} sets
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-100"
        >
          <input type="checkbox" />
          <div className="flex gap-1 items-center collapse-title">
            <DocumentTextIcon className="w-4 h-4" /> Notes
          </div>
          <div className="collapse-content">
            <span className="text-sm">{notes || '...'}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-4 self-end">
          <div className="badge badge-accent gap-2">
            <BeakerIcon className="w-4 h-4" />
            {toTitleCase(target)}
          </div>
          <div className="badge badge-accent gap-2">
            <BoltIcon className="w-4 h-4" />
            {toTitleCase(mode)}
          </div>
        </div>
      </div>
    </div>
  );
};
