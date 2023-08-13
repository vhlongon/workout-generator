import { UserButton, auth } from '@clerk/nextjs';
import { headers } from 'next/headers';
import { SignInButton } from './SignInButton';

const isWhiteListedPage = () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const blackList = ['/sign-in', '/sign-up', '/'];
  return !blackList.includes(pathname);
};

export const Header = () => {
  const { userId } = auth();
  const showUserInfo = isWhiteListedPage();

  return (
    <header className="flex justify-between p-4">
      {showUserInfo ? (
        <>
          <h1>Workout generator</h1>
          {userId ? (
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
        </>
      ) : (
        <div>This is a closed beta</div>
      )}
    </header>
  );
};
