import { CreateWorkoutForm } from '@/components/CreateWorkoutForm';

const WorkoutsPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <CreateWorkoutForm
        exercises={[
          { name: 'Romanian deadlift', sets: 3, reps: [10] },
          { name: 'Bench Press', sets: 3, reps: [10] },
          { name: 'Squat', sets: 3, reps: [8, 12] },
          { name: 'Deadlift', sets: 3, reps: [6, 8] },
          { name: 'Overhead Press', sets: 4, reps: [12, 15] },
        ]}
        mode="HYPERTROPHY"
        target="FULL_BODY"
      />
    </div>
  );
};

export default WorkoutsPage;
