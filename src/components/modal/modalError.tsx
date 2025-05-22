import React from "react";

interface Props {
  onClose: () => void;
}

const ModalWrong: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg w-11/12 max-w-sm">
        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
          Wrong ❌
        </h3>
        <button
          onClick={onClose}
          className="px-5 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ModalWrong;
