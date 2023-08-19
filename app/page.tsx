import { ProtectForm } from '@/components/ProtectForm';
import { isValidProtectPasswordInCookies } from '@/helpers/protect';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const getCatchPhrase = () => {
  const phrases = [
    'Get fit with the power of AI-generated workouts!',
    'Transform your body with personalized AI workouts!',
    'Experience the future of fitness with AI-generated routines!',
    'Maximize your gains with AI-powered workouts!',
    'Elevate your fitness game with AI-generated routines!',
    'Achieve your fitness goals with the help of AI!',
    'Revolutionize your workouts with AI-generated routines!',
    'Unleash your full potential with AI-powered workouts!',
    'Take your fitness to the next level with AI-generated routines!',
    'Get the perfect workout with AI-generated routines tailored just for you!',
  ];

  return phrases[Math.floor(Math.random() * phrases.length)];
};
const HomePage = () => {
  const isAuthorized = isValidProtectPasswordInCookies();

  if (isAuthorized) {
    redirect('/home');
  }

  const phrase = getCatchPhrase();

  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="max-w-4xl hero bg-base-200 border-2 border-base-300 rounded-3xl p-4">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            width={300}
            height={300}
            className="mask mask-decagon w-52 h-52 lg:w-72 lg:h-72"
            src="/robot2.png"
            alt="Robot"
          />
          <div>
            <h1 className="text-lg lg:text-2xl font-bold italic border-l-4 border-secondary p-4 text-gray-200">
              {phrase}
            </h1>
            <div className="max-w-xs mx-auto lg:ml-0">
              <div className="flex flex-col max-w-xs">
                <p className="py-6 text-center lg:lg:text-left text-gray-300">
                  This is a closed beta please enter the password to continue.
                </p>
                <ProtectForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
