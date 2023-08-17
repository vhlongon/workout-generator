import { auth, currentUser } from '@clerk/nextjs';
import {
  Cog6ToothIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { NavLink } from './NavLink';
import { SignOutButton } from './SignOutButton';
import Link from 'next/link';

export const Header = async () => {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <header className="navbar bg-base-100 p-4 shadow-xl">
      <div className="flex gap-4 flex-1">
        {userId && (
          <div className="avatar">
            <div className="tooltip tooltip-bottom w-8 rounded-full ring ring-primary ring-offset-base-100">
              <Image
                width={32}
                height={32}
                className={twMerge(!user?.imageUrl ? 'bg-white' : '')}
                src={user?.imageUrl ?? '/user-placeholder.png'}
                alt={user?.username ?? `user ${userId}`}
              />
            </div>
          </div>
        )}
        <Link href="/home">
          <h1 className="font-accent text-sm tracking-wide sm:text-xl text-primary">
            <span className="hidden sm:block">Workout generator</span>
            <span className="sm:hidden">WG</span>
          </h1>
        </Link>
      </div>

      {userId && (
        <div className="flex-none">
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li>
              <NavLink href="/home" title="Home">
                <HomeIcon className="w-4 h-4" />
              </NavLink>
            </li>
            <li>
              <NavLink href="/create" title="Create workout">
                <DocumentPlusIcon className="w-4 h-4" />
              </NavLink>
            </li>
            <li>
              <NavLink href="/workouts" title="Workouts">
                <DocumentTextIcon className="w-4 h-4" />
              </NavLink>
            </li>
            <li>
              <NavLink href="/dashboard" title="Dashboard">
                <Cog6ToothIcon className="w-4 h-4" />
              </NavLink>
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
