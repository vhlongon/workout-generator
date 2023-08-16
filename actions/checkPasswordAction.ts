'use server';
import { encode, isValidProtectPassword } from '@/helpers/protect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const checkPasswordAction = async (e: FormData) => {
  const password = e.get('password');
  if (typeof password !== 'string') {
    return;
  }

  const isValid = isValidProtectPassword(password);

  if (!isValid) {
    return {
      error: 'Password is not valid',
    };
  }

  cookies().set('protect-password', encode(password), {
    httpOnly: true,
    maxAge: 999999,
  });

  redirect('/home');
};
