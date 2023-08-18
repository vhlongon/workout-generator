import { Mode, Target } from '@prisma/client';
import { SuggestionForm } from './SuggestionForm';

const initialSuggestionData = {
  mode: Mode.HYPERTROPHY,
  target: Target.FULL_BODY,
  totalSets: 12,
};

const CreateWorkoutPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <SuggestionForm
        initialValues={initialSuggestionData}
        buttonText="Suggest"
        title="Get a workout suggestion"
      />
    </div>
  );
};

export default CreateWorkoutPage;
