import React from "react";
import Grid from "../../grid/grid";
import ModalSuccess from "../../modal/modalSuccess";
import ModalWrong from "../../modal/modalError";
import Navbar from "../../navbar/navbar";

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
    <div className="w-full max-w-3xl mx-auto p-1 text-center">
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

      {showModal && (
        <ModalSuccess
          isGameFinished={isGameFinished}
          onNextLevel={onNextLevel}
          onRepeat={onRepeat}
          onRestart={onRestart}
        />
      )}

      {showWrongModal && <ModalWrong onClose={onCloseWrong} />}
    </div>
  );
};

export default GameUI;
