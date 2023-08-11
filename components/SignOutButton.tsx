'use client';
import { SignOutButton as ClerkSignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const SignOutButton = () => {
  const router = useRouter();

  return (
    <ClerkSignOutButton
      signOutCallback={() => {
        router.push('/');
      }}
    >
      <button>Sign out</button>
    </ClerkSignOutButton>
  );
};
