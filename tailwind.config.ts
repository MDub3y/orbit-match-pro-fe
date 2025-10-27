import type { Config } from 'tailwindcss';

const config: Config = {
    // Enable Dark Mode via the 'class' strategy
    darkMode: 'class',
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Semantic Colors defined by CSS variables
                'orbit-primary': '#0057E7', // Fixed brand color
                'bg-page': 'var(--color-bg-page)',
                'bg-card': 'var(--color-bg-card)',
                'text-default': 'var(--color-text-default)',
                'border-default': 'var(--color-border-default)',
                'orbit-purple': '#945dff',
                'orbit-pink': '#FF3366',
            },
            // ... (Include your animation keyframes here if needed)
        },
    },
    plugins: [],
};
export default config;