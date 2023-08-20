import { WorkoutCardSkeleton } from '@/components/WorkoutCardSkeleton';

const WorkoutLoading = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex-col flex justify-center items-center gap-4 pt-10">
      <div className="w-44 h-8 bg-base-200 rounded-lg animate-pulse self-start"></div>
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-col-4 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <WorkoutCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutLoading;
