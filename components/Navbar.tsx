// frontend/src/components/Navbar.tsx

'use client';
import React from 'react';
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Moon, Sun } from 'lucide-react'; 
import { useThemeStore } from '@/store/themeStore';
import { ORBIT_COLORS } from '@/lib/constants';
import Link from 'next/link';
import OrbitLogo from './OrbitLogo';

// Define the core application links
const AppLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Matcher', href: '/match' },
    { name: 'Products', href: '/products' },
    { name: 'Pricing', href: '/pricing' },
];

const Navbar: React.FC = () => {
    const { darkMode, toggleDarkMode } = useThemeStore();
    
    // Note: Since this Navbar is designed for the application routes, 
    // we use a clean full-width approach (no maxWidthClass needed).
    
    return (
        <header 
            className="sticky top-0 z-40 w-full bg-bg-card/95 backdrop-blur-sm border-b border-border-default h-16 flex items-center transition-colors duration-300"
        >
            <div className="flex justify-between items-center h-full w-full px-4 md:px-8">
                
                {/* LEFT SIDE: Brand Logo and Conditional App Navigation */}
                <div className="flex items-center space-x-8 h-full">
                    
                    {/* Brand Logo (Simplified since the full Lottie is complex) */}
                    {/* <Link href="/" className="font-bold text-xl text-orbit-primary">ORBIT</Link> */}
                    <OrbitLogo />
                    
                    {/* Application Navigation (Only visible when signed in) */}
                    <SignedIn>
                        <nav className="hidden md:flex space-x-6 text-sm font-medium">
                            {AppLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href} 
                                    className="text-text-default hover:text-orbit-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </SignedIn>
                </div>
                
                {/* RIGHT SIDE: Toggle and Auth Widget */}
                <div className="flex items-center space-x-4">
                    
                    {/* Dark Mode Toggle */}
                    <button 
                        onClick={toggleDarkMode} 
                        className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {darkMode ? <Sun size={20} color={ORBIT_COLORS.secondary} /> : <Moon size={20} color={ORBIT_COLORS.primary} />}
                    </button>
                    
                    <SignedOut>
                        {/* Show Sign In link directly when logged out */}
                         {/* <Link 
                            href="/sign-in" 
                            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                            style={{ backgroundColor: ORBIT_COLORS.primary }}
                        >
                            Sign In
                        </Link> */}
                        <div className="p-2 text-white bg-[#945dff] rounded-md">
                        <SignInButton />
                        </div>
                    </SignedOut>

                    <SignedIn>
                        {/* Show User Button when logged in */}
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
};

export default Navbar;