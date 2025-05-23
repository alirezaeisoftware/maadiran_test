import React from 'react';
import Grid from '../../grid/grid';
import Navbar from '../../navbar/navbar';
import SuccessModal from '../../modal/successModal';
import ErrorModal from '../../modal/errorModal';

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
  onCloseSuccess: () => void;
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
  onCloseSuccess,
}) => {
  return (
    <div
      className={`w-full max-w-3xl mx-auto p-1 text-center
         text-gray-900
         dark:text-gray-100
        transition-colors duration-300`}
    >
      <Navbar level={level} onRestartConfirmed={onRestart} />

      <Grid
        rows={rows}
        cols={cols}
        baseColor={baseColor}
        diffColor={diffColor}
        diffIndex={diffIndex}
        onCellClick={onCellClick}
      />

      <SuccessModal
        isVisible={showModal}
        isGameFinished={isGameFinished}
        onNextLevel={onNextLevel}
        onRepeat={onRepeat}
        onRestart={onRestart}
        onClose={onCloseSuccess}
      />
      <ErrorModal isVisible={showWrongModal} onClose={onCloseWrong} />
    </div>
  );
};

export default GameUI;
