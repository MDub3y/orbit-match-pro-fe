'use client'; 

import { Inter } from 'next/font/google';
import "./globals.css";
import { useThemeStore } from '@/store/themeStore';
import { useEffect } from 'react';

import ClientClerkProvider from '@/components/ClerkProvider';
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
      {/* FIX: Wrap the application with the client-side provider */}
      <ClientClerkProvider> 
        <body
          className={`bg-bg-page text-text-default ${inter.className}`}
        >
          {/* Layout components remain clean */}
          <Navbar /> 
          <main className="lg:pl-64 pt-16">
              {children}
          </main>
        </body>
      </ClientClerkProvider>
    </html>
  );
}