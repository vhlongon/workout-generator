import { UserButton, auth } from '@clerk/nextjs';
import { headers } from 'next/headers';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

const isSignInOrSignUp = () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  return pathname === '/sign-in' || pathname === '/sign-up';
};

export const Header = () => {
  const { userId } = auth();
  const signInOrSignUp = isSignInOrSignUp();

  return (
    <header className="flex justify-between p-4">
      <h1>Workout generator</h1>
      {signInOrSignUp ? null : userId ? (
        <div className="flex gap-4">
          <UserButton
            afterSignOutUrl="/"
            userProfileUrl="/dashboard"
            showName
            signInUrl="/sign-in"
            userProfileMode="navigation"
          />
          {/* <SignOutButton /> */}
        </div>
      ) : (
        <SignInButton />
      )}
    </header>
  );
};
