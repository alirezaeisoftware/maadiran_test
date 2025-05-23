import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import LightIcon from '/icons/summer_14388078.webp';
import DarkIcon from '/icons/moon_740866.webp';
import ConfirmModal from '../modal/confirmModal';

interface NavbarProps {
  level: number;
  onRestartConfirmed: () => void;
}

const buttonClasses = {
  base: 'py-1 rounded transition',
  themeToggle: 'hover:opacity-80 focus:ring-gray-400',
  restart:
    'bg-blue-700 px-2 text-base md:text-lg text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 focus:ring-blue-500',
};

const navClasses = `
  my-5 flex items-center justify-between border border-transparent
  px-4 py-2 shadow-2xl rounded-md
  bg-indigo-100 text-gray-800
  dark:bg-gray-800 dark:text-white
  transition-colors duration-300
`;

const Navbar: React.FC<NavbarProps> = ({ level, onRestartConfirmed }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark';
    setIsDarkMode(isDark);
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      const root = window.document.documentElement;
      root.classList.toggle('dark', newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <nav className={navClasses}>
      <button
        onClick={toggleTheme}
        className={clsx(buttonClasses.base, buttonClasses.themeToggle)}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        data-testid="theme-toggle-button"
      >
        <img
          src={isDarkMode ? LightIcon : DarkIcon}
          alt={isDarkMode ? 'Light mode' : 'Dark mode'}
          className="w-8 h-8 md:w-10 md:h-10"
          loading="lazy"
        />
      </button>

      {level >= 1 && (
        <button
          onClick={() => setShowConfirmModal(true)}
          className={clsx(buttonClasses.base, buttonClasses.restart)}
          data-testid="restart-button"
        >
          Start Again
        </button>
      )}

      <div
        className="font-bold text-base md:text-lg select-none"
        data-testid="level-display"
      >
        Level {level + 1}
      </div>

      <ConfirmModal
        isVisible={showConfirmModal}
        message="Are you sure you want to restart the game?"
        onConfirm={() => {
          setShowConfirmModal(false);
          onRestartConfirmed();
        }}
        onCancel={() => setShowConfirmModal(false)}
      />
    </nav>
  );
};

export default Navbar;
