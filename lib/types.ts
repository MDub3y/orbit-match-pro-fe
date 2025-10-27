// frontend/src/types.ts
// Re-declare backend types for frontend consumption

// We need to mirror the University model from Prisma, but fields are camelCase on the client side
export interface University {
    id: string;
    name: string;
    programType: string;
    medianGmat: number;
    medianGpa: number;
    medianWorkExp: number;
    avgScholarshipAmt: number;
    qualProfileFocus: string[];
}

export interface ExtractedKeywords {
    impact_score: number;
    keywords: string[];
}

export interface UserProfile {
    gmat_score: number;
    gpa: number;
    work_exp: number;
    alpha: number;
    program_type: string;
    ai_extracted_keywords: ExtractedKeywords | null;
    resume_feedback: string;
}

export interface MatchResult {
    university: University;
    S_admit: number;
    S_scholarship: number;
    S_qualitative: number;
    S_total: number;
}