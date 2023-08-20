import { UserProfile, currentUser } from '@clerk/nextjs';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUser();

  return {
    title: user ? `${user.username}'s settings` : 'Settings',
  };
}

const DashboardPage = async () => {
  return (
    <div className="w-full flex justify-center items-center">
      <UserProfile />
    </div>
  );
};

export default DashboardPage;
