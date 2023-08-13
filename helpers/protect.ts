import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const decode = (input: string) => atob(input);

export const encode = (input: string) => btoa(input);

export const isValidProtectPassword = (password: string) => {
  return password === process.env.PROTECT_SECRET;
};

export const isValidProtectPasswordInCookies = () => {
  const hashInCookies = cookies().get('protect-password')?.value ?? '';
  const isAuthorized = isValidProtectPassword(decode(hashInCookies));

  return isAuthorized;
};

export const protectMiddleware = async (req: NextRequest) => {
  const isAuthorized = isValidProtectPasswordInCookies();
  const pathname = req.nextUrl.pathname;
  const isRoot = pathname === '/';

  if (isRoot) {
    return NextResponse.next();
  }

  if (!isAuthorized) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
