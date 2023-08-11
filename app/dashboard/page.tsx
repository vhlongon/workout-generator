import { UserProfile } from '@clerk/nextjs';

const DashboardPage = async () => {
  return (
    <div className="w-full flex justify-center items-center">
      <UserProfile />
    </div>
  );
};

export default DashboardPage;
