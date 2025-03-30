import env from '../config/env';

// Define all available themes with their respective color values
const themes = {
    'red-wine': {
        primary: '#4c2215',
        secondary: '#981d26',
        accent: '#e5a631',
        background: '#f2e1c5',
    },
    'forest-glade': {
        primary: '#225733',
        secondary: '#66a182',
        accent: '#d9ad3d',
        background: '#f0f8e2',
    },
    'desert-bloom': {
        primary: '#a85532',
        secondary: '#d18975',
        accent: '#f5c767',
        background: '#f8f0e3',
    },
    'midnight-plum': {
        primary: '#361e38',
        secondary: '#6a4c93',
        accent: '#e0aaff',
        background: '#f3eef7',
    },
    'spice-market': {
        primary: '#c25238',
        secondary: '#e6a756',
        accent: '#78c2a4',
        background: '#f9f0e2',
    },
    'custom': {
        primary: '#ECA72C',
        secondary: '#435378',
        accent: '#F9F8F8',
        background: '#273043',
    }
};

// Type for theme values
export type Theme = {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
};

// Get the current theme from environment variables or use default
export function getCurrentTheme(): Theme {
    const themeName = env.THEME;
    return themes[themeName as keyof typeof themes] || themes['red-wine']; // Fallback to red-wine if theme not found
}

// This function is no longer needed for SSR, but kept for reference or future client-side theming needs
export function applyTheme() {
    if (typeof document === 'undefined') return; // Skip on server-side

    const root = document.documentElement;
    const theme = getCurrentTheme();

    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
} 