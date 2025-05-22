import React, { useState } from "react";
import ConfirmModal from "../modal/confirmModal";

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
      className="mt-10 flex items-center justify-between border-solid
 px-4 py-2 shadow-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-colors rounded-md"
    >
      <button
        onClick={onToggleTheme}
        className="px-3 py-1 bg-gray-500 dark:bg-gray-700 rounded-md hover:scale-105 transition"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      {level >= 1 && (
        <button
          onClick={handleRestartClick}
          className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          start again
        </button>
      )}

      <div className="font-bold text-lg">level {level + 1}</div>

      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure to restart the game?"
          onConfirm={handleConfirmRestart}
          onCancel={handleCancelRestart}
        />
      )}
    </nav>
  );
};

export default Navbar;
