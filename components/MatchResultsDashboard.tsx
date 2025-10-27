'use client';

import React, { useState, useMemo } from 'react';
import { useMatchStore } from '@/store/matchStore';
import { MatchResult } from '@/lib/types';
import MatchCard from './MatchCard';

interface DashboardProps {
    results: MatchResult[];
}

export default function MatchResultsDashboard({ results: initialResults }: DashboardProps) {
    const { profile, setProfile } = useMatchStore();
    const [alpha, setAlpha] = useState(profile.alpha);
    const alphaPercent = Math.round(alpha * 100);

    const sortedResults = useMemo(() => {
        const reSorted = initialResults.map(result => ({
            ...result,
            S_total: (alpha * result.S_admit) + ((1 - alpha) * result.S_scholarship) + result.S_qualitative
        }));
        
        reSorted.sort((a, b) => b.S_total - a.S_total);
        return reSorted;
    }, [alpha, initialResults]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAlpha = parseFloat(e.target.value) / 100;
        setAlpha(newAlpha);
        setProfile({ alpha: newAlpha });
    };

    return (
        <div className="space-y-12">
            
            <div className="p-8 rounded-xl shadow-lg bg-blue-50 border-2 border-orbit-primary animate-fadeIn">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Dynamic Strategy Control</h3>
                <label className="block text-lg font-semibold mb-4 text-center">
                    Current Focus: <span className="text-orbit-primary">{alphaPercent}% Admission Chance</span> / <span className="text-orbit-secondary">{100 - alphaPercent}% Financial Aid/ROI</span>
                </label>
                
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-orbit-secondary whitespace-nowrap">Max ROI/Aid</span>
                    
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={alphaPercent}
                        onChange={handleSliderChange}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200"
                        style={{ background: `linear-gradient(to right, #FFC800 0%, #FFC800 ${100-alphaPercent}%, #0057E7 ${100-alphaPercent}%, #0057E7 100%)` }}
                    />

                    <span className="text-sm font-medium text-orbit-primary whitespace-nowrap">Max Admission Odds</span>
                </div>
            </div>

            {/* Profile Gap Analysis (AI Resume Editor Integration) */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md border-l-4 border-orbit-purple animate-slideIn">
                <h3 className="text-2xl font-bold mb-3 flex items-center text-orbit-purple">
                    <span className="mr-2">💡</span> AI Profile Gap Analysis
                </h3>
                <p className="text-gray-700 mb-4 italic leading-relaxed">{profile.resume_feedback}</p>
                <div className="text-sm text-gray-600 border-t pt-3">
                    <p><strong>Keywords Identified:</strong> <span className="font-mono bg-gray-200 px-1 rounded text-xs">{profile.ai_extracted_keywords?.keywords.join(' | ') || 'N/A'}</span></p>
                    <p className="mt-1">**Insight:** Focus on refining these areas based on your chosen strategy to boost your <strong>S_qualitative</strong> score.</p>
                </div>
            </div>

            {/* Ranked University List */}
            <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Top Match Results (Ranked by Strategy Score)</h3>
                
                <div className="flex justify-end space-x-3">
                    <button className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                        Export Full PDF Report (Bonus)
                    </button>
                </div>

                {sortedResults.map((result, index) => (
                    <MatchCard key={result.university.id} result={result} rank={index + 1} profile={profile} />
                ))}
            </div>
        </div>
    );
}