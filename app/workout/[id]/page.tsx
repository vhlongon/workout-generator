import { getWorkoutAction } from '@/actions/getWorkoutAction';
import UpdateWorkoutFlow from './UpdateWorkoutFlow';
import { formatWorkoutData } from '@/helpers/format';
import { ErrorMessage } from '@/components/ErrorMessage';

type WorkoutPageProps = {
  params: {
    id: string;
  };
};
const WorkoutPage = async ({ params }: WorkoutPageProps) => {
  const { data, error } = await getWorkoutAction(params.id);

  if (error) {
    return (
      <div className="w-full max-w-fit mx-auto flex items-center justify-center">
        <ErrorMessage>{error}</ErrorMessage>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl">Workout not found</h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <UpdateWorkoutFlow
        initialValues={formatWorkoutData(data)}
        buttonText="Update Workout"
        title={data.name}
      />
    </div>
  );
};

export default WorkoutPage;
