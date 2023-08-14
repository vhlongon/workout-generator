import { ClerkProvider } from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '../components/Header';
import './globals.css';
import { twMerge } from 'tailwind-merge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workout generator',
  description: 'Create workout plans and routines with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="synthwave">
      <ClerkProvider
        appearance={{
          baseTheme: shadesOfPurple,
        }}
      >
        <body className={twMerge(inter.className, 'bg-base-100')}>
          <div className="flex min-h-[100dvh] flex-col">
            <Header />
            <main className="flex w-full flex-grow">{children}</main>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
