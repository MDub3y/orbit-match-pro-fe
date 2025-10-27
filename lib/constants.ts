// frontend/src/lib/constants.ts
// Use NEXT_PUBLIC for client-side environment variables

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// For styling consistency (Tailwind class names use these)
export const ORBIT_COLORS = {
    primary: '#0057E7', // Strong Blue
    secondary: '#FFC800', // Yellow/Gold
    purple: '#945dff',
    pink: '#FF3366',
    bg_light: '#F9FAFB',
    bg_dark: '#1A202C',
    card_light: '#FFFFFF',
    card_dark: '#2D3748',
};