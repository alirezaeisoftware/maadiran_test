import React from 'react';
import GameModal from './modal';

interface ErrorModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isVisible, onClose }) => {
  return (
    <GameModal
      isVisible={isVisible}
      onClose={onClose}
      title="Wrong ❌"
      footer={
        <button
          onClick={onClose}
          className="px-5 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition"
        >
          Retry
        </button>
      }
    ></GameModal>
  );
};

export default ErrorModal;
