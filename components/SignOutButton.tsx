'use client';
import { SignOutButton as ClerkSignOutButton } from '@clerk/nextjs';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export const SignOutButton = () => {
  const router = useRouter();

  return (
    <ClerkSignOutButton
      signOutCallback={() => {
        router.push('/sign-in');
      }}
    >
      <div className="tooltip tooltip-bottom" data-tip="Log out">
        <ArrowLeftOnRectangleIcon className="h-4 w-4" />
      </div>
    </ClerkSignOutButton>
  );
};
