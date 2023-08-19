import { getWorkoutAction } from '@/actions/getWorkoutAction';
import { WorkoutForm } from '@/app/create/WorkoutForm';
import { ErrorMessage } from '@/components/ErrorMessage';
import { formatWorkoutData } from '@/helpers/format';

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
      <WorkoutForm
        initialValues={formatWorkoutData(data)}
        buttonText="Update Workout"
        title={data.name}
        mode="update"
      />
    </div>
  );
};

export default WorkoutPage;
