'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Zap, BookOpen, Clock, Settings, FileText, GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ORBIT_COLORS } from '@/lib/constants';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { 
        name: 'All Apps', 
        children: [
            { name: 'Right Fit Matcher', href: '/match', icon: GraduationCap },
            { name: 'Scholarship Matcher', href: '#', icon: Zap },
            { name: 'AI Resume Editor', href: '#', icon: FileText },
            { name: 'AI Counselor Solvi', href: '#', icon: Users },
            { name: 'Application Planner', href: '#', icon: Clock },
            { name: 'AI Essay Editor', href: '#', icon: BookOpen },
            { name: 'LOR Writer', href: '#', icon: FileText },
            { name: 'Mentor Marketplace', href: '#', icon: Users },
        ]
    },
    { name: 'Academic Profile', href: '#', icon: BookOpen },
    { name: 'Resources', href: '#', icon: Zap },
    { name: 'Feedback', href: '#', icon: Settings },
    { name: 'Account Settings', href: '#', icon: Settings },
];

const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const renderNavItems = (items: typeof navItems) => {
        return items.map((item) => {
            if (item.children) {
                // Renders the 'All Apps' dropdown section
                return (
                    <div key={item.name} className="py-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase px-4">{item.name}</span>
                        <div className="space-y-1 mt-1">
                            {item.children.map((child) => (
                                <Link key={child.name} href={child.href} passHref
                                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors group text-sm ${
                                        pathname === child.href
                                            ? 'bg-blue-100 text-orbit-primary font-semibold'
                                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <child.icon size={16} />
                                    <span>{child.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            }

            // Renders single link items
            const isActive = pathname.startsWith(item.href) && item.href !== '#';

            return (
                <Link key={item.name} href={item.href} passHref
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group text-sm ${
                        isActive
                            ? 'bg-blue-100 text-orbit-primary font-semibold'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                    <item.icon size={20} style={{ color: isActive ? ORBIT_COLORS.primary : undefined }} />
                    <span>{item.name}</span>
                </Link>
            );
        });
    };

    return (
        <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed h-full pt-16 hidden lg:block">
            <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-100px)]">
                {renderNavItems(navItems)}
            </div>
            
            {/* Campus Ambassador (bottom panel) */}
            <div className="absolute bottom-0 w-full p-4 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Campus Ambassador &gt;</div>
                <p className="text-[11px] text-gray-500">Lead your campus. Unlock rewards.</p>
            </div>
        </aside>
    );
};

export default Sidebar;