import { CreateWorkoutForm } from '@/components/CreateWorkoutForm';

const WorkoutsPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      Workout page
      <CreateWorkoutForm
        exercises={[
          { name: 'Bench Press', sets: 3, reps: [10] },
          { name: 'Squat', sets: 3, reps: [6, 12] },
          { name: 'Deadlift', sets: 3, reps: [6, 10] },
          { name: 'Overhead Press', sets: 4, reps: [8, 15] },
        ]}
        mode="HYPERTROPHY"
        target="FULL_BODY"
      />
    </div>
  );
};

export default WorkoutsPage;
