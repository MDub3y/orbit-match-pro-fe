'use client';
import React, { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { ORBIT_COLORS } from '@/lib/constants';
import { Moon, Sun, ChevronDown, LogIn, UserPlus } from 'lucide-react'; 
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

interface HeaderProps {
    isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {
    const { darkMode, toggleDarkMode } = useThemeStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Landing page is max-w-6xl center; App header is full width
    const maxWidthClass = isLandingPage ? 'max-w-6xl mx-auto' : 'w-full px-4 md:px-8';

    // 1. Navigation Content (Dashboard vs. Marketing Links)
    const NavContent = isLandingPage ? (
        // Marketing Links (Home, Products, Pricing)
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <Link href="/" className="text-text-default hover:text-orbit-primary transition-colors">Home</Link>
            <a href="/products" className="text-text-default hover:text-orbit-primary transition-colors">Products</a>
            <a href="/pricing" className="text-text-default hover:text-orbit-primary transition-colors">Pricing</a>
        </nav>
    ) : (
        // Application Title (Used when Sidebar is present)
        <span className="font-bold text-xl text-text-default hidden lg:block">Dashboard</span> 
    );
    
    // 2. Auth Management Widget (The core logic)
    const AuthWidget = (
        <div className="relative">
            <SignedOut>
                {/* Logged OUT: Show Dropdown Menu */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-1 p-2 rounded-lg text-sm font-medium text-text-default border border-transparent hover:border-border-default transition-colors"
                >
                    Account 
                    <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div 
                        className="absolute right-0 mt-2 w-48 bg-bg-card border border-border-default rounded-lg shadow-xl py-1 z-50 animate-fadeIn"
                        // Simple mouse handler to close the menu
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        <Link href="/sign-in" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 px-4 py-2 text-sm text-text-default hover:bg-gray-100 dark:hover:bg-gray-700">
                            <LogIn size={16} />
                            <span>Sign In</span>
                        </Link>
                        <Link href="/sign-up" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 px-4 py-2 text-sm text-text-default hover:bg-gray-100 dark:hover:bg-gray-700">
                            <UserPlus size={16} />
                            <span>Sign Up</span>
                        </Link>
                    </div>
                )}
            </SignedOut>

            <SignedIn>
                {/* Logged IN: Show User Button */}
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
        </div>
    );
    
    // 3. Logo Rendering
    const Logo = (
        <div className="flex items-center space-x-2">
            <Player
                autoplay
                loop
                src="https://lottie.host/b0afb2fe-f10f-403b-b61b-41086badbf45/U9tI3GGAyB.lottie"
                style={{ height: '40px', width: '40px' }}
            />
            <span className="font-bold text-xl text-text-default">ORBIT</span>
        </div>
    );

    return (
        <header 
            className="sticky top-0 z-40 w-full bg-bg-card/95 backdrop-blur-sm border-b border-border-default h-16 flex items-center transition-colors duration-300"
        >
            <div className={`flex justify-between items-center h-full w-full ${maxWidthClass}`}>
                
                {/* LEFT SIDE: Logo and Navigation Links */}
                <div className="flex items-center space-x-6 h-full">
                    {Logo}
                    {NavContent}
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
                    
                    {/* Auth Widget (Dropdown or UserButton) */}
                    {AuthWidget}
                </div>
            </div>
        </header>
    );
};

export default Header;