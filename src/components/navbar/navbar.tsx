import React, { useState } from "react";
import LightIcon from "../../../public/icons/summer_14388078.webp";
import DarkIcon from "../../../public/icons/moon_740866.webp";
import GameModal from "../modal/modal";

interface NavbarProps {
  level: number;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  onRestartConfirmed: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  level,
  onToggleTheme,
  isDarkMode,
  onRestartConfirmed,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRestartClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmRestart = () => {
    setShowConfirmModal(false);
    onRestartConfirmed();
  };

  const handleCancelRestart = () => {
    setShowConfirmModal(false);
  };

  return (
    <nav
      className={`mt-10 flex items-center justify-between border border-transparent
        px-4 py-2 shadow-2xl rounded-md
        bg-white text-gray-800
        dark:bg-gray-800 dark:text-white
        transition-colors duration-300`}
    >
      <button
        onClick={onToggleTheme}
        className={`
          px-3 py-1 rounded-md transition
          
          
        `}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <img
          src={isDarkMode ? LightIcon : DarkIcon}
          alt={isDarkMode ? "Light mode icon" : "Dark mode icon"}
          className="w-10 h-10"
          loading="lazy"
        />
      </button>

      {level >= 1 && (
        <button
          onClick={handleRestartClick}
          className={`
            px-3 py-1 rounded
            bg-blue-700 text-white
            hover:bg-blue-600
            dark:bg-blue-600 dark:hover:bg-blue-500
            transition
            focus:outline-none focus:ring-2 focus:ring-offset-1
            focus:ring-blue-500
          `}
        >
          start again
        </button>
      )}

      <div className="font-bold text-lg select-none">level {level + 1}</div>

      <GameModal
        type="confirm"
        isVisible={showConfirmModal}
        message="Are you sure you want to restart the game?"
        onConfirm={handleConfirmRestart}
        onCancel={handleCancelRestart}
      />
    </nav>
  );
};

export default Navbar;
