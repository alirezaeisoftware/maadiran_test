import React, { useState } from "react";
import clsx from "clsx";
import LightIcon from "/icons/summer_14388078.webp";
import DarkIcon from "/icons/moon_740866.webp";
import GameModal from "../modal/modal";

interface NavbarProps {
  level: number;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  onRestartConfirmed: () => void;
}

const buttonClasses = {
  base: "py-1 rounded transition",
  themeToggle: "hover:opacity-80 focus:ring-gray-400",
  restart:
    "bg-blue-700 px-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 focus:ring-blue-500",
};

const navClasses = `
  my-5 flex items-center justify-between border border-transparent
  px-4 py-2 shadow-2xl rounded-md
  bg-white-900 text-gray-800
  dark:bg-gray-800 dark:text-white
  transition-colors duration-300
`;

const Navbar: React.FC<NavbarProps> = ({
  level,
  onToggleTheme,
  isDarkMode,
  onRestartConfirmed,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <nav className={navClasses}>
      <button
        onClick={onToggleTheme}
        className={clsx(buttonClasses.base, buttonClasses.themeToggle)}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        data-testid="theme-toggle-button"
      >
        <img
          src={isDarkMode ? LightIcon : DarkIcon}
          alt={isDarkMode ? "Light mode" : "Dark mode"}
          className="w-10 h-10"
          loading="lazy"
          width={40}
          height={40}
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
        className="font-bold text-lg select-none"
        data-testid="level-display"
      >
        Level {level + 1}
      </div>

      <GameModal
        type="confirm"
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
