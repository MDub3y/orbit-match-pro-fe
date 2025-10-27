'use client'; 

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define colors based on the semantic names from your tailwind config
const ORBIT_COLORS = {
    primary: '#0057E7',      // Deep Blue
    accentPurple: '#945dff', // Vibrant Purple
    secondary: '#FFC800', // Bright Yellow
    accentPink: '#FF3366',   // Pink accent for the badge/gradients
};

const PRIMARY_HEADLINE_FONT = 'font-serif text-orbit-primary';

// --- Data Structure for the User Journey Visual Narrative ---
const UserJourneySteps = [
    { 
        id: 1, 
        title: "Define Your Profile", 
        description: "Input core metrics (GMAT, GPA, Work Exp) to start. The system immediately scopes the search to best-fit programs for your target degree.",
        imageSrc: "/score.png", // Corresponds to the score/metrics input screen
        imageAlt: "1. Input Core Metrics Screen",
        order: 'lg:order-first',
    },
    { 
        id: 2, 
        title: "AI Profile Gap Analysis", 
        description: "Paste your resume. Our AI extracts core keywords and identifies your profile gaps relative to top-tier program requirements.",
        imageSrc: "/resume.png", // Corresponds to the AI Resume Scan step
        imageAlt: "2. AI Resume Scan Step",
        order: 'lg:order-last',
    },
    { 
        id: 3, 
        title: "Set Your Strategy (ROI vs. Odds)", 
        description: "Use the dynamic Strategy Slider to instantly weigh the results towards maximizing scholarship potential or acceptance probability.",
        imageSrc: "/strategy.png", // Corresponds to the Strategy Slider step
        imageAlt: "3. Strategy Slider Screen",
        order: 'lg:order-first',
    },
    { 
        id: 4, 
        title: "Get Your Ranked Roadmap", 
        description: "View university matches ranked by your personalized Fit Score, complete with data visualization and mentor connection links.",
        imageSrc: "/result.png", // Corresponds to the Top Match Results card view
        imageAlt: "4. Match Results Dashboard",
        order: 'lg:order-last',
    },
];


export default function LandingPage() {
    const router = useRouter();

    const handleMatchClick = () => {
        router.push('/match'); 
    };

    const handleExploreClick = () => {
        console.log("Explore Products clicked!");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-bg-page text-text-default">
            
            {/* 1. TOP ANNOUNCEMENT BAR */}
            <div className="w-full">
                <div className="w-full bg-gray-100 dark:bg-gray-800 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                    Introducing AI counselor Solvi
                </div>
            </div>

            {/* Main Content Area (Hero Section) */}
            <main className="flex flex-1 flex-col items-center justify-center text-center px-4 md:px-8 max-w-4xl mx-auto mt-32">
                
                {/* Trusted by Badge */}
                <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-10"
                    style={{ backgroundColor: ORBIT_COLORS.accentPurple + '1A', color: ORBIT_COLORS.accentPurple }}>
                    <span role="img" aria-label="star" className="text-xl">⭐</span>
                    <span className="text-sm font-medium">Trusted by 100K+ students worldwide</span>
                </div>

                {/* Hero Title */}
                <h1 className={`text-5xl md:text-6xl font-serif font-extrabold mb-4 leading-tight ${PRIMARY_HEADLINE_FONT}`}>
                    Find your right fit college
                </h1>

                {/* Hero Subtitle */}
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
                    Orbit provides personalized college counseling with AI helping you discover best fit schools, craft standout applications, and win scholarships.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-24">
                    <button
                        onClick={handleMatchClick}
                        className="px-8 py-3 text-lg font-semibold rounded-lg text-white transition-colors shadow-lg hover:shadow-xl"
                        style={{ backgroundColor: ORBIT_COLORS.accentPurple }}
                    >
                        Match now
                    </button>
                    <button
                        onClick={handleExploreClick}
                        className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-border-default text-text-default transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Explore products
                    </button>
                </div>


                {/* ------------------------------------------------------------- */}
                {/* SECTION 1: VISUAL NARRATIVE USER JOURNEY */}
                {/* ------------------------------------------------------------- */}
                <h2 className="text-3xl md:text-4xl font-extrabold mt-12 mb-16 text-text-default">
                    Your Path to Admission, Simplified.
                </h2>
                
                <div className="w-full space-y-24">
                    {UserJourneySteps.map((step, index) => (
                        <div key={step.id} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            
                            {/* Text Content */}
                            <div className={`space-y-4 ${step.order}`}>
                                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: ORBIT_COLORS.accentPurple }}>
                                    STEP {step.id} / 4
                                </p>
                                <h3 className="text-2xl md:text-3xl font-bold text-text-default">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </p>
                            </div>
                            
                            {/* Image Showcase (Uses local assets) */}
                            <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden border border-border-default/50 hover:shadow-primary-lg transition-shadow duration-300">
                                <img 
                                    src={step.imageSrc} 
                                    alt={step.imageAlt} 
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                        </div>
                    ))}
                </div>


                {/* ------------------------------------------------------------- */}
                {/* SECTION 2: STUDENT DASHBOARD SNAPSHOT */}
                {/* ------------------------------------------------------------- */}
                <h2 className="text-3xl md:text-4xl font-extrabold mt-32 mb-8 text-text-default">
                    The Central Dashboard
                </h2>
                <div className="relative w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden border-4 border-orbit-primary/50">
                    <img 
                        src="/dashboard.png" 
                        alt="Student Dashboard Overview" 
                        className="w-full h-auto object-cover"
                    />
                </div>
            </main>

            {/* Bottom Left Badge */}
            <div className="fixed bottom-0 left-0 right-0 py-2 sm:py-0 sm:bottom-4 sm:left-4 z-50">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm px-6 py-2 rounded-lg shadow-xl animate-bounce inline-block sm:block">
                    FREEBIE FOR YOU!
                </div>
            </div>
        </div>
    );
}