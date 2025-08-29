/**
 * ThemeToggle Component - Following TaskFlow Specifications
 * Theme switcher with smooth transitions and accessibility
 */

'use client';

import { ThemeToggleProps } from '@/types';

/**
 * Theme toggle component following TaskFlow design system
 * Provides light/dark mode switching with proper accessibility
 */
export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const toggleTheme = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center w-12 h-6 rounded-full
        transition-colors duration-200 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900
        ${theme === 'dark' 
          ? 'bg-slate-600 hover:bg-slate-500' 
          : 'bg-slate-300 hover:bg-slate-400'
        }
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
    >
      {/* Toggle Circle */}
      <span
        className={`
          absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200
          flex items-center justify-center
          ${theme === 'dark' ? 'translate-x-3' : '-translate-x-3'}
        `}
      >
        {/* Icon */}
        {theme === 'light' ? (
          // Sun Icon
          <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // Moon Icon
          <svg className="w-3 h-3 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </span>

      {/* Screen Reader Text */}
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </button>
  );
}
