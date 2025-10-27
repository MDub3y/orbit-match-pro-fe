/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useMatchStore } from '@/store/matchStore';

// Helper for button styling
const PrimaryButton: React.FC<any> = ({ children, onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 rounded-lg text-gray-700 font-bold transition-transform transform hover:scale-[1.02] ${
            disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-orbit-primary shadow-lg hover:shadow-xl'
        } ${className}`}
    >
        {children}
    </button>
);

// --- Step 1: Metrics ---
export const StepMetrics: React.FC<any> = ({ nextStep }) => {
    const { profile, setProfile } = useMatchStore();
    const [errors, setErrors] = useState({ gmat: '', gpa: '', work_exp: '' });

    const validate = () => {
        let isValid = true;
        const newErrors = { gmat: '', gpa: '', work_exp: '' };
        
        // GMAT Check (Example)
        if (profile.gmat_score < 400 || profile.gmat_score > 800) {
            newErrors.gmat = 'GMAT must be between 400 and 800.';
            isValid = false;
        }
        
        // GPA Check (Example)
        if (profile.gpa < 0.0 || profile.gpa > 4.0) {
            newErrors.gpa = 'GPA must be between 0.0 and 4.0.';
            isValid = false;
        }
        
        
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const updatedValue = type === 'number' ? parseFloat(value) : value;
        setProfile({ [name]: updatedValue });
    };

    const handleSubmit = () => {
        if (validate()) {
            nextStep();
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Core Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ... (Input fields for GMAT, GPA, Work Exp using profile state and handleChange) ... */}
                {/* Example Input: */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">GMAT/GRE Equivalent (400-800)</label>
                    <input type="number" name="gmat_score" value={profile.gmat_score} onChange={handleChange}
                        className={`mt-1 text-gray-700 block w-full border border-gray-300 rounded-lg shadow-sm p-3`}
                    />
                </div>
                
                {/* Program Type Select */}
                <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Target Program Type</label>
                    <select name="program_type" value={profile.program_type} onChange={handleChange}
                        className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-lg shadow-sm p-3"
                    >
                        <option value="MBA">MBA (Master of Business Administration)</option>
                        <option value="MS">MS (Master of Science/Engineering)</option>
                    </select>
                </div>
            </div>
            
            <div className="flex justify-end pt-4">
                <PrimaryButton onClick={handleSubmit} disabled={!validate()}>Next: AI Scan</PrimaryButton>
            </div>
        </div>
    );
};

// --- Step 2: Resume Scan ---
export const StepResume: React.FC<any> = ({ onScan, prevStep, loading }) => {
    const { profile } = useMatchStore();
    const [rawText, setRawText] = useState('');
    const disabled = rawText.length < 50 || loading;

    const handleSubmit = () => {
        if (onScan && !disabled) {
            onScan(rawText);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Profile Analysis (AI Resume Scan)</h2>
            <p className="text-sm text-gray-500">Paste your resume text below. Our **AI Resume Editor** component will extract key achievements and focus areas for matching.</p>
            
            <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={10}
                placeholder="Paste your resume text here (min 50 characters)..."
                className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-lg shadow-inner p-4 focus:ring-2 focus:ring-orbit-primary"
            />
            
            {profile.ai_extracted_keywords?.keywords?.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 animate-slideIn">
                    <p className="font-semibold text-green-700">Keywords Extracted:</p>
                    <p className="text-green-600 italic font-mono text-sm">{profile.ai_extracted_keywords.keywords.join(', ')}</p>
                </div>
            )}

            <div className="flex justify-between pt-4">
                <button onClick={prevStep} disabled={loading} className="text-gray-600 hover:text-gray-900 transition-colors">← Back</button>
                <PrimaryButton onClick={handleSubmit} disabled={disabled}>
                    {loading ? 'Scanning Profile...' : 'Run AI Profile Scan'}
                </PrimaryButton>
            </div>
        </div>
    );
};

// --- Step 3: Preferences ---
export const StepPreferences: React.FC<any> = ({ onSubmit, prevStep, loading }) => {
    const { profile, setProfile } = useMatchStore();
    const alphaPercent = Math.round(profile.alpha * 100);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAlpha = parseFloat(e.target.value) / 100;
        setProfile({ alpha: newAlpha });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Strategy Preference</h2>
            <p className="text-sm text-gray-500">Control your application strategy: Do you want to **maximize admission odds** or **optimize for the best financial aid (ROI)**?</p>
            
            <div className="p-6 rounded-xl border border-gray-200 shadow-md bg-white">
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                    Strategy Focus:
                </label>
                
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-orbit-secondary whitespace-nowrap">Max ROI/Aid ($\alpha=0$)</span>
                    
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={alphaPercent}
                        onChange={handleSliderChange}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200"
                        style={{ background: `linear-gradient(to right, #FFC800 0%, #FFC800 ${100-alphaPercent}%, #0057E7 ${100-alphaPercent}%, #0057E7 100%)` }}
                    />

                    <span className="text-sm font-medium text-orbit-primary whitespace-nowrap">Max Admission Odds ($\alpha=1$)</span>
                </div>
            </div>
            
            <div className="flex justify-between pt-6">
                <button onClick={prevStep} disabled={loading} className="text-gray-600 hover:text-gray-900 transition-colors">← Back</button>
                <PrimaryButton onClick={onSubmit} disabled={loading}>
                    {loading ? 'Calculating Results...' : 'Get Personalized Strategy'}
                </PrimaryButton>
            </div>
        </div>
    );
};