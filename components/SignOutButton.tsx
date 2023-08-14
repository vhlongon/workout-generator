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
      <button>
        <ArrowLeftOnRectangleIcon
          title="Log out"
          className="text-white h-6 w-6"
        />
      </button>
    </ClerkSignOutButton>
  );
};
