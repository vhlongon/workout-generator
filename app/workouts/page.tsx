import { SaveWorkoutForm } from '@/components/SaveWorkoutForm';
import { SuggestWorkoutForm } from '@/components/SuggestWorkoutForm';

const WorkoutsPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <SuggestWorkoutForm />
    </div>
  );
};

export default WorkoutsPage;
