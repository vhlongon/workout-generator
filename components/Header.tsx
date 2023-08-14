import { UserButton, auth } from '@clerk/nextjs';
import { SignOutButton } from './SignOutButton';

export const Header = () => {
  const { userId } = auth();

  return (
    <header className="flex justify-between p-4">
      <h1>Workout generator</h1>
      {userId && (
        <div className="flex gap-4">
          <UserButton showName userProfileMode="navigation" />
          <SignOutButton />
        </div>
      )}
    </header>
  );
};
