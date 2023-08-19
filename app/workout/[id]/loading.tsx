import { WorkoutFormSkeleton } from '@/components/WorkoutFormSkeleton';

const WorkoutLoading = () => {
  return (
    <div className="max-w-[400px] w-full mx-auto flex justify-center items-center">
      <WorkoutFormSkeleton />
    </div>
  );
};

export default WorkoutLoading;
