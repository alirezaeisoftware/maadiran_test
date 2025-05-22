import React from "react";
import Grid from "../../grid/grid";
import Navbar from "../../navbar/navbar";
import GameModal from "../../modal/modal";

interface Props {
  level: number;
  rows: number;
  cols: number;
  baseColor: string;
  diffColor: string;
  diffIndex: number;
  showModal: boolean;
  showWrongModal: boolean;
  isGameFinished: boolean;
  onCellClick: (idx: number) => void;
  onReset: () => void;
  onNextLevel: () => void;
  onRepeat: () => void;
  onRestart: () => void;
  onCloseWrong: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const GameUI: React.FC<Props> = ({
  level,
  rows,
  cols,
  baseColor,
  diffColor,
  diffIndex,
  showModal,
  showWrongModal,
  isGameFinished,
  onCellClick,
  onNextLevel,
  onRepeat,
  onRestart,
  onCloseWrong,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <div
      className={`w-full max-w-3xl mx-auto p-1 text-center
         text-gray-900
         dark:text-gray-100
        transition-colors duration-300`}
    >
      <Navbar
        level={level}
        onToggleTheme={onToggleTheme}
        isDarkMode={isDarkMode}
        onRestartConfirmed={onRestart}
      />

      <Grid
        rows={rows}
        cols={cols}
        baseColor={baseColor}
        diffColor={diffColor}
        diffIndex={diffIndex}
        onCellClick={onCellClick}
      />

      <GameModal
        type="success"
        isVisible={showModal}
        isGameFinished={isGameFinished}
        onNextLevel={onNextLevel}
        onRepeat={onRepeat}
        onRestart={onRestart}
      />

      <GameModal
        type="error"
        isVisible={showWrongModal}
        onCancel={onCloseWrong}
      />
    </div>
  );
};

export default GameUI;
