import { getWorkoutAction } from '@/actions/getWorkoutAction';
import { WorkoutForm } from '@/app/create/WorkoutForm';
import { ErrorMessage } from '@/components/ErrorMessage';
import { formatWorkoutData } from '@/helpers/format';
import { Metadata } from 'next';

type WorkoutParams = {
  id: string;
};
type WorkoutPageProps = {
  params: WorkoutParams;
};

export const generateMetadata = async ({
  params,
}: WorkoutPageProps): Promise<Metadata> => {
  const { id } = params;
  const { data } = await getWorkoutAction(id);

  return {
    title: data ? `Workout: ${data.name}` : 'Workout not found',
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

  const initialValues = formatWorkoutData(data);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <WorkoutForm
        initialValues={initialValues}
        buttonText="Update Workout"
        title={data.name}
        mode="update"
      />
    </div>
  );
};

export default WorkoutPage;
