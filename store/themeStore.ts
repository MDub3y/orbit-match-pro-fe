import { create } from 'zustand';

interface ThemeState {
    darkMode: boolean;
    toggleDarkMode: () => void;
    initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    darkMode: false,

    toggleDarkMode: () => {
        set((state) => {
            const newMode = !state.darkMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', newMode);
            return { darkMode: newMode };
        });
    },

    initializeTheme: () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialMode = savedTheme === 'dark' || (savedTheme === null && prefersDark);

        set({ darkMode: initialMode });
        document.documentElement.classList.toggle('dark', initialMode);
    },
}));