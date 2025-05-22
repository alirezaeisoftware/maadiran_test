import React from "react";

interface GameModalProps {
  type: "success" | "error" | "confirm";
  title?: string;
  message?: string;
  isGameFinished?: boolean;
  isVisible: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onNextLevel?: () => void;
  onRepeat?: () => void;
  onRestart?: () => void;
}

const GameModal: React.FC<GameModalProps> = ({
  type,
  title,
  message,
  isGameFinished,
  isVisible,
  onConfirm,
  onCancel,
  onNextLevel,
  onRepeat,
  onRestart,
}) => {
  if (!isVisible) return null;

  const getContent = () => {
    switch (type) {
      case "success":
        return (
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
                  Retry
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
                  Retry
                </button>
              </>
            )}
          </div>
        );

      case "error":
        return (
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition"
          >
            Retry
          </button>
        );

      case "confirm":
        return (
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Confirm
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg text-center text-gray-900 dark:text-gray-100 transition">
        <h3 className="text-xl font-semibold mb-4">
          {title || getDefaultTitle(type, isGameFinished)}
        </h3>
        {message && <p className="mb-4">{message}</p>}
        {getContent()}
      </div>
    </div>
  );
};

const getDefaultTitle = (type: string, isGameFinished?: boolean) => {
  switch (type) {
    case "success":
      return isGameFinished ? "Congratulations! 🎉" : "Correct ✅";
    case "error":
      return "Wrong ❌";
    case "confirm":
      return "Are you sure?";
    default:
      return "";
  }
};

export default GameModal;
