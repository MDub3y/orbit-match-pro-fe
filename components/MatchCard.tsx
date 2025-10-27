/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { UserProfile, MatchResult } from '../lib/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ORBIT_COLORS } from '@/lib/constants';

interface MatchCardProps {
    result: MatchResult;
    rank: number;
    profile: UserProfile;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;
        const value = dataPoint.name.includes('GMAT') ? payload[0].value * 200 : payload[0].value; 
        return (
            <div className="bg-white dark:bg-gray-700 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-xl text-sm transition-colors">
                <p className="font-bold text-gray-900 dark:text-white">{dataPoint.name}</p>
                <p className="text-gray-700 dark:text-gray-300">
                    {dataPoint.name.includes('GMAT') ? `Score: ${Math.round(value)}` : `Score: ${value.toFixed(2)}`}
                </p>
            </div>
        );
    }
    return null;
};

const MatchCard: React.FC<MatchCardProps> = ({ result, rank, profile }) => {
    const { university, S_total, S_admit, S_scholarship } = result;
    const totalPercent = Math.round(S_total * 100);
    const admitPercent = Math.round(S_admit * 100);
    const scholarshipPercent = Math.round(S_scholarship * 100);

    const chartData = [
        { name: 'Your GPA', value: profile.gpa, fill: ORBIT_COLORS.primary },
        { name: 'Median GPA', value: university.medianGpa, fill: ORBIT_COLORS.secondary },
        { name: 'Your GMAT', value: profile.gmat_score / 200, fill: ORBIT_COLORS.primary },
        { name: 'Median GMAT', value: university.medianGmat / 200, fill: ORBIT_COLORS.secondary },
    ];
    
    return (
        <div className="p-6 border rounded-xl shadow-lg hover:shadow-2xl transition-all 
                        bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 animate-fadeIn">
            
            <div className="w-full md:w-1/3 space-y-3">
                <div className="flex items-center space-x-3">
                    <span className="text-xl font-extrabold px-3 py-1 rounded-lg text-white" style={{ backgroundColor: ORBIT_COLORS.primary }}>{rank}</span>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{university.name}</h4>
                </div>
                <p className="text-sm text-gray-500">{university.programType}</p>
                <div className="text-3xl font-extrabold pt-2">
                    <span className="text-orbit-primary">{totalPercent}%</span> Fit Score
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Based on your strategic weighting.</p>
            </div>
            
            <div className="w-full md:w-2/3 grid grid-cols-2 gap-x-6 gap-y-4">
                
                <div className="col-span-2">
                    <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Metrics Visualizer (Data Visualization Bonus)</h5>
                    <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                            <YAxis hide domain={[0, 4]} />
                            {/* Corrected: Using the external CustomTooltip component */}
                            <Tooltip content={<CustomTooltip />} /> 
                            <Bar dataKey="value" barSize={15} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Admission Odds Bar */}
                <div>
                    <div className="font-semibold text-sm text-gray-700 dark:text-gray-300">Admission Odds: {admitPercent}%</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full bg-orbit-primary" style={{ width: `${admitPercent}%` }}></div>
                    </div>
                </div>
                
                {/* Scholarship Potential Bar */}
                <div>
                    <div className="font-semibold text-sm text-gray-700 dark:text-gray-300">Scholarship Potential: {scholarshipPercent}%</div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="h-2.5 rounded-full bg-orbit-secondary" style={{ width: `${scholarshipPercent}%` }}></div>
                    </div>
                </div>
                
                {/* Mentor Marketplace CTA */}
                <div className="col-span-2 pt-2">
                    <button className="inline-block text-sm font-semibold p-3 rounded-lg transition-colors bg-orbit-purple  text-gray-900 dark:text-white hover:bg-opacity-90 shadow-md">
                        Connect with Mentor from {university.name} → (Mentor Marketplace Integration)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;