import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Link from 'next/link';

const getUserName = (user: User) => {
  if (user.username) {
    return user.username;
  }

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName) {
    return user.firstName;
  }

  return user.id;
};
const Homepage = async () => {
  const user = await currentUser();

  return (
    <div className="w-full flex justify-center items-center">
      {user ? (
        <h2 className="text-lg font-semibold">
          Welcome back{' '}
          <span className="text-secondary">{getUserName(user)}</span>!
        </h2>
      ) : (
        <div className="flex flex-col items-center gap-2 text-lg">
          <div className="flex gap-2 items-center">
            Please
            <Link className="btn btn-secondary btn-xs" href="/sign-in">
              login
            </Link>
          </div>
          <span className="font-accent text-sm">or</span>
          <div className="flex gap-2 items-center">
            <Link className="btn btn-secondary btn-xs" href="/sign-up">
              create
            </Link>
            an account
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
