import React from 'react';
import GameModal from './modal';

interface SuccessModalProps {
  isVisible: boolean;
  isGameFinished?: boolean;
  onNextLevel?: () => void;
  onRepeat?: () => void;
  onRestart?: () => void;
  onClose?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  isGameFinished,
  onNextLevel,
  onRepeat,
  onRestart,
  onClose,
}) => {
  return (
    <GameModal
      isVisible={isVisible}
      onClose={onClose}
      title={isGameFinished ? 'Congratulations! 🎉' : 'Correct ✅'}
      footer={
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {isGameFinished ? (
            <>
              <button
                onClick={onRestart}
                className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
              >
                Start again
              </button>
              <button
                onClick={onRepeat}
                className="flex-1 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition"
              >
                Retry this level
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onNextLevel}
                className="flex-1 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition"
              >
                Next
              </button>
              <button
                onClick={onRepeat}
                className="flex-1 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition"
              >
                Retry this level
              </button>
            </>
          )}
        </div>
      }
    ></GameModal>
  );
};

export default SuccessModal;
