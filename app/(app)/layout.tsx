// frontend/src/app/(main)/layout.tsx (APPLICATION SHELL)

import React from 'react';
import { SignedIn } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      
      <SignedIn>
        <Sidebar />
        
        <main className="">
          {children}
        </main>
      </SignedIn>
    </>
  );
}