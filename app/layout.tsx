'use client';

import { Inter } from 'next/font/google';

import "./globals.css";
import { useThemeStore } from '@/store/themeStore';
import { useEffect } from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import HeaderAndSidebarWrapper from '@/components/Wrapper';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <html lang="en">
      <ClerkProvider>
      <body
        className={`bg-bg-page text-text-default ${inter.className}`}
      >
        {/* <HeaderAndSidebarWrapper>
        {children}
        </HeaderAndSidebarWrapper> */}
        <Navbar />
        <main className="">
            {children}
        </main>
      </body>
      </ClerkProvider>
    </html>
  );
}
