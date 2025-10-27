'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

export default function HeaderAndSidebarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    const isLandingPage = pathname === '/';

    if (isLandingPage) {
        return <>{children}</>;

    }
    
    return (
        <>
            <Header />
            <Sidebar />
            <main className="lg:pl-64 pt-16">
                {children}
            </main>
        </>
    );
}