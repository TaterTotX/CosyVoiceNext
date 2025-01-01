import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
                                                     isDarkMode,
                                                     onToggle
                                                 }) => {
    return (
        <button
            onClick={onToggle}
            className={`absolute top-6 right-6 p-2.5 rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 ${
                isDarkMode
                    ? 'bg-neutral-700 text-neutral-300'
                    : 'bg-neutral-200 text-neutral-600'
            }`}
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

export default ThemeToggle;