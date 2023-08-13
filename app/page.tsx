import { ProtectForm } from '@/components/ProtectForm';
import { isValidProtectPasswordInCookies } from '@/helpers/protect';
import { redirect } from 'next/navigation';

const HomePage = () => {
  const isAuthorized = isValidProtectPasswordInCookies();

  if (isAuthorized) {
    redirect('/home');
  }

  return (
    <div className="w-full flex justify-center items-center">
      <ProtectForm />
    </div>
  );
};

export default HomePage;
