import React, { useEffect, useState } from "react";
import GameUI from "./gameUi/gameUi";
import { useGameLogic } from "../../hooks/gameLogics/useGameLogics";

const Game: React.FC = () => {
  const {
    level,
    rows,
    cols,
    baseColor,
    diffColor,
    diffIndex,
    showModal,
    showWrongModal,
    isGameFinished,
    handleClick,
    handleNextLevel,
    handleRepeatLevel,
    handleRestart,
    resetGame,
    closeWrongModal,
  } = useGameLogic();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (level !== null) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [level]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (level === null) {
    return (
      <div className="p-5 text-center text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <GameUI
      level={level}
      rows={rows}
      cols={cols}
      baseColor={baseColor}
      diffColor={diffColor}
      diffIndex={diffIndex}
      showModal={showModal}
      showWrongModal={showWrongModal}
      isGameFinished={isGameFinished}
      onCellClick={handleClick}
      onReset={resetGame}
      onNextLevel={handleNextLevel}
      onRepeat={handleRepeatLevel}
      onRestart={handleRestart}
      onCloseWrong={closeWrongModal}
      isDarkMode={isDarkMode}
      onToggleTheme={toggleTheme}
    />
  );
};

export default Game;
