import { getUserNameOrId } from '@/helpers/data';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';

const Homepage = async () => {
  const user = await currentUser();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {user ? (
        <h2 className="text-lg font-semibold">
          Welcome back{' '}
          <span className="text-secondary">{getUserNameOrId(user)}</span>!
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

      <div className="flex flex-col gap-4 mt-16 border border-gray-500 rounded p-4 text-gray-500">
        <span className="text-center block font-bold">Upcomming features:</span>
        <ul>
          <li>
            {/* TODO: Add sorting and filter  */}
            <code>- Sort and filter workouts</code>
          </li>
          <li>
            {/* TODO: Add favourites  */}
            <code>- Add favourite workouts</code>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
