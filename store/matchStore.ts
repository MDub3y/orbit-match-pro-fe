import { create } from 'zustand';
import { MatchResult, UserProfile } from '@/lib/types';

interface MatchState {
    profile: UserProfile;
    setProfile: (updates: Partial<UserProfile>) => void;
    results: MatchResult[];
    setResults: (results: MatchResult[]) => void;
    loading: boolean;
    setLoading: (status: boolean) => void;
    error: string | null;
    setError: (message: string | null) => void;
}

const initialProfile: UserProfile = {
    gmat_score: 700, gpa: 3.7, work_exp: 5, alpha: 0.5,
    program_type: 'MBA', ai_extracted_keywords: { impact_score: 0, keywords: [] },
    resume_feedback: "",
};

export const useMatchStore = create<MatchState>((set) => ({
    profile: initialProfile,
    results: [],
    loading: false,
    error: null,

    setProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
    })),

    setResults: (results) => set({ results }),
    setLoading: (status) => set({ loading: status }),
    setError: (message) => set({ error: message }),
}));