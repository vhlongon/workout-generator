'use server';
import { encode, isValidProtectPassword } from '@/helpers/protect';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const checkPassword = async (e: FormData) => {
  await sleep(1000);
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
    path: '/',
    maxAge: 999999,
    secure: true,
  });

  redirect('/home');
};
