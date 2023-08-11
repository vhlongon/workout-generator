import { ClerkProvider } from '@clerk/nextjs';
import { shadesOfPurple } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '../components/Header';
import './globals.css';

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
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: shadesOfPurple,
        }}
      >
        <body className={inter.className}>
          <div className="flex min-h-[100dvh] flex-col">
            <Header />
            <main className="flex w-full flex-grow">{children}</main>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
