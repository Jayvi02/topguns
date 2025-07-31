'use client';

import { useTheme } from '../contexts/ThemeContext';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Switch Base */}
        <div className="w-12 h-16 theme-bg border-2 theme-border rounded-2xl shadow-lg relative">
          {/* Switch Handle */}
          <button
            onClick={toggleTheme}
            className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 theme-accent border-2 theme-border rounded-full transition-all duration-300 ease-in-out shadow-md flex items-center justify-center ${
              theme === 'light' 
                ? 'top-1 hover:top-0.5' 
                : 'bottom-1 hover:bottom-0.5'
            }`}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {/* Sun Icon for Light Mode */}
            {theme === 'light' && (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                <path d="M12 6v2M12 16v2M6 12h2M16 12h2"/>
              </svg>
            )}
            
            {/* Moon Icon for Dark Mode */}
            {theme === 'dark' && (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
