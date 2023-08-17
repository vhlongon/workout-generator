import { getWorkoutAction } from '@/actions/getWorkoutAction';
import UpdateWorkoutFlow from './UpdateWorkoutFlow';
import { formatWorkoutData } from '@/helpers/format';

type WorkoutPageProps = {
  params: {
    id: string;
  };
};
const WorkoutPage = async ({ params }: WorkoutPageProps) => {
  const { data, error } = await getWorkoutAction(params.id);

  if (error) {
    return <div>something went wrong: {error}</div>;
  }

  if (!data) {
    return <div>Workout not found</div>;
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
