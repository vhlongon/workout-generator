import { ClerkProvider } from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter, Ultra } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import { Header } from '../components/Header';
import './globals.css';
import { CSSProperties } from 'react';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ultra = Ultra({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ultra',
});

export const metadata: Metadata = {
  title: 'Workout generator',
  description: 'Create workout plans and routines with ease',
};

const isRoot = () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  return pathname === '/';
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const isRootPath = isRoot();

  return (
    <html lang="en" data-theme="synthwave">
      <ClerkProvider
        appearance={{
          baseTheme: shadesOfPurple,
        }}
      >
        <body
          style={
            {
              '--font-inter': inter.style.fontFamily,
              '--font-ultra': ultra.style.fontFamily,
            } as CSSProperties
          }
          className={twMerge(inter.className, 'bg-base-100')}
        >
          <div className="flex min-h-[100dvh] flex-col">
            {!isRootPath && <Header />}
            <main className="flex w-full flex-grow p-4 mx-auto">
              {children}
            </main>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
