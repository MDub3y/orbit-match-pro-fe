/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Zap, Clock, GraduationCap } from 'lucide-react';
import { ORBIT_COLORS } from '@/lib/constants';

// Simple Reusable Card Component
const DashboardCard: React.FC<{ title: string; value: string | number; description: string; color: string }> = ({ title, value, description, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4" style={{ borderColor: color }}>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h2 className="text-3xl font-extrabold mt-1" style={{ color: color }}>{value}</h2>
        <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">{description}</p>
    </div>
);

// Large Content Card
const ContentCard: React.FC<{ title: string; children: React.ReactNode; icon: React.FC<any>; actionText: string }> = ({ title, children, icon: Icon, actionText }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700 h-96">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                <Icon size={20} className="mr-2 text-orbit-primary" />
                {title}
            </h3>
            <span className="text-sm text-orbit-primary font-medium cursor-pointer hover:underline">{actionText}</span>
        </div>
        <div className="flex flex-col items-center justify-center h-4/5 text-center">
            {children}
        </div>
    </div>
);

export default function StudentDashboard() {
    return (
        <div className="lg:pl-64 pt-20 p-4 md:p-8 bg-orbit-bg dark:bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Welcome and Counselor Box */}
                <div className="flex justify-between items-start mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Manasvi!</h1>
                        <p className="text-md text-gray-500 dark:text-gray-400">Here&apos;s an overview of your application progress</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center text-sm bg-blue-50 dark:bg-gray-700 border-blue-200 dark:border-gray-600">
                        <p className="font-semibold" style={{ color: ORBIT_COLORS.primary }}>Your Counselor</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">No counselor assigned</p>
                    </div>
                </div>

                {/* KPI Cards (Total, Submitted, Pending) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardCard title="TOTAL UNIVERSITIES" value={0} description="Selected for application" color={ORBIT_COLORS.primary} />
                    <DashboardCard title="SUBMITTED" value={0} description="Applications completed" color={ORBIT_COLORS.secondary} />
                    <DashboardCard title="PENDING" value={0} description="Tasks remaining" color={ORBIT_COLORS.purple} />
                    <DashboardCard title="NEXT DEADLINE" value="No upcoming deadlines" description="Upcoming application" color={ORBIT_COLORS.pink} />
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Universities Card */}
                    <ContentCard title="Universities" icon={GraduationCap} actionText="View all">
                        <div className="my-10">
                            <div className="w-20 h-20 border-4 rounded-full border-gray-200 flex items-center justify-center mx-auto mb-4" style={{ borderColor: ORBIT_COLORS.primary, borderStyle: 'dotted' }}>
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: ORBIT_COLORS.primary, opacity: 0.2 }}></div>
                            </div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">No universities</p>
                            <p className="text-sm text-gray-500">Get started by adding a university to your list.</p>
                            <button className="mt-4 px-4 py-2 text-white font-bold rounded-lg" style={{ backgroundColor: ORBIT_COLORS.primary }}>
                                Add University
                            </button>
                        </div>
                    </ContentCard>
                    
                    {/* Pending Tasks Card (Application Planner) */}
                    <ContentCard title="Pending Tasks" icon={Clock} actionText="View all">
                        <p className="text-xl text-gray-400">No pending tasks</p>
                        <p className="text-sm text-gray-500 mt-2">0 tasks remaining from your application planner</p>
                    </ContentCard>

                    {/* My Scholarships Card (Scholarship Matcher) */}
                    <ContentCard title="My Scholarships" icon={Zap} actionText="Track your applications">
                        <p className="text-lg text-gray-500">You haven&apos;t added any scholarships yet.</p>
                        <button className="mt-4 px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Add Scholarship
                        </button>
                    </ContentCard>
                </div>
            </div>
        </div>
    );
}