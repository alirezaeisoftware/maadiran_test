import React from "react";
import Modal from "./modal";

interface Props {
  isGameFinished: boolean;
  onNextLevel: () => void;
  onRepeat: () => void;
  onRestart: () => void;
}

const ModalSuccess: React.FC<Props> = ({
  isGameFinished,
  onNextLevel,
  onRepeat,
  onRestart,
}) => {
  return (
    <Modal title={isGameFinished ? "Congratulation! 🎉" : "Correct ✅"}>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {isGameFinished ? (
          <>
            <button
              onClick={onRestart}
              className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300"
            >
              Start again
            </button>
            <button
              onClick={onRepeat}
              className="flex-1 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Retry
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onNextLevel}
              className="flex-1 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors duration-300"
            >
              Next
            </button>
            <button
              onClick={onRepeat}
              className="flex-1 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Retry
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalSuccess;
