'use client';
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs';

export const SignInButton = () => {
  return (
    <ClerkSignInButton mode="modal" afterSignInUrl="/workouts">
      <button>Sign in</button>
    </ClerkSignInButton>
  );
};
