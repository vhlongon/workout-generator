import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <SignUp redirectUrl="/home" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
