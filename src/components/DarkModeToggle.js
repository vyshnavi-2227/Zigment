import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
  onClick={toggleDarkMode}
  className="relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 py-2 px-6 rounded-lg shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-300 transition-transform transform active:scale-95"
>
  <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
  <span className="relative z-10 font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
</button>

  );
};

export default DarkModeToggle;
