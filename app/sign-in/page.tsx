import { SignIn } from '@clerk/nextjs';

type SignInPageProps = {
  searchParams: {
    redirectUrl?: string;
  };
};

const SignInPage = ({ searchParams }: SignInPageProps) => {
  const { redirectUrl } = searchParams;

  return (
    <div className="w-full flex justify-center items-center">
      <SignIn redirectUrl={redirectUrl || '/'} signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
