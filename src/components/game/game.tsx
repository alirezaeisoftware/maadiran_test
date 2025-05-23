import React, { useEffect, useState } from 'react';
import GameUI from './gameUi/gameUi';
import { useGameLogic } from '../../hooks/gameLogics/useGameLogics';

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
    closeSuccessModal,
  } = useGameLogic();

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

  if (isLoading || level === null) {
    return (
      <div
        className="flex items-center justify-center h-screen transition-colors duration-500 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
        role="status"
        aria-label="loading spinner"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400"></div>
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
      onCloseSuccess={closeSuccessModal}
    />
  );
};

export default Game;
