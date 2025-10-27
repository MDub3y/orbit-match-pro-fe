'use client'; 
import React from 'react';
import dynamic from 'next/dynamic';
import { SignedIn } from '@clerk/nextjs';

// 1. Dynamically import the Sidebar component, disabling SSR
const LazySidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      
      <SignedIn>
        {/* 2. Use the Lazy-Loaded Sidebar */}
        <LazySidebar />
        
        <main className="-mt-12"> 
          {children}
        </main>
      </SignedIn>
    </>
  );
}