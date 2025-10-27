// frontend/src/app/match/page.tsx
'use client';

import React, { useState } from 'react';
import { useMatchStore } from '@/store/matchStore';
import { StepMetrics, StepResume, StepPreferences } from '@/components/FormSteps';
import MatchResultsDashboard from '@/components/MatchResultsDashboard';
import { API_BASE_URL } from '@/lib/constants';
import LoadingSpinner from '@/components/LoadingSpinner';

const TOTAL_STEPS = 3;

export default function MatchingPage() {
  const { profile, setProfile, results, setLoading, setError, loading, error, setResults } = useMatchStore();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => Math.min(TOTAL_STEPS + 1, prev + 1));
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  // Handle all API calls and state updates
  // ... (handleResumeScan and handleSubmit logic as defined in the previous response's page.tsx) ...
  const handleResumeScan = async (rawText: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/profile/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_text: rawText }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'AI Profile scan failed.');
      }

      const data = await response.json();
      setProfile({ 
        ai_extracted_keywords: data.ai_extracted_keywords,
        resume_feedback: data.resume_feedback 
      });
      nextStep();
    } catch (e: any) {
      setError(e.message || 'An error occurred during AI scan.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const { resume_feedback, ...matchData } = profile; 
      const response = await fetch(`${API_BASE_URL}/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchData),
      });

      if (!response.ok) {
         const err = await response.json();
         throw new Error(err.error || 'Matching algorithm failed.');
      }

      const data = await response.json();
      setResults(data);
      nextStep(); 
    } catch (e: any) {
      setError(e.message || 'An error occurred during matching.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepMetrics nextStep={nextStep} />;
      case 2:
        return <StepResume onScan={handleResumeScan} prevStep={prevStep} loading={loading} />;
      case 3:
        return <StepPreferences onSubmit={handleSubmit} prevStep={prevStep} loading={loading} />;
      case 4:
        return <MatchResultsDashboard results={results} />;
      default:
        return <div>An unknown error occurred.</div>;
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 bg-orbit-bg">
      <div className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border-t-4 border-orbit-primary">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-gray-900">
          Orbit Match Pro: Holistic Strategy Engine
        </h1>
        <p className="text-center text-gray-500 mb-10 text-lg">
            {step <= TOTAL_STEPS ? `Step ${step} of ${TOTAL_STEPS}: Define Your Profile & Strategy` : "Your Personalized Strategy"}
        </p>

        {/* Global Error State */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-4 mb-6 rounded-lg animate-fadeIn">
            <p className="font-bold">System Error</p>
            <p>{error}</p>
          </div>
        )}

        {renderStep()}
        
      </div>
    </div>
  );
}