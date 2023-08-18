import { formatDate, toTitleCase } from '@/helpers/format';
import {
  BeakerIcon,
  BoltIcon,
  DocumentTextIcon,
  ListBulletIcon,
  TagIcon,
} from '@heroicons/react/24/solid';
import { Exercise, Workout } from '@prisma/client';
import { twMerge } from 'tailwind-merge';
import { FavouriteButton } from './FavouriteButton';
import Link from 'next/link';
import { ActionButtons } from './ActionButtons';

type CardProps = Workout & {
  exercises: Exercise[];
  className?: string;
};
export const WorkoutCard = ({
  createdAt,
  id,
  mode,
  name,
  notes,
  target,
  exercises,
  isFavourite,
  className,
}: CardProps) => {
  return (
    <div
      className={twMerge(
        'card bg-neutral h-full border border-primary shadow-xl',
        className
      )}
    >
      <div className="flex items-center gap-1 text-xs text-success absolute top-0 right-0 p-2">
        <FavouriteButton id={id} isFavourite={Boolean(isFavourite)} />
      </div>

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
                    <span className="flex items-center gap-1">
                      <span className="text-[0.5rem]">◉</span>
                      {toTitleCase(name)}, {sets} sets, {repsValue} reps
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

        <div className="card-actions w-full mt-4">
          <div className="w-full flex gap-2 justify-end">
            <div className="badge badge-accent gap-2">
              <BeakerIcon className="w-4 h-4" />
              {toTitleCase(target)}
            </div>
            <div className="badge badge-accent gap-2">
              <BoltIcon className="w-4 h-4" />
              {toTitleCase(mode)}
            </div>
          </div>
          <ActionButtons id={id} />
        </div>
      </div>
    </div>
  );
};
