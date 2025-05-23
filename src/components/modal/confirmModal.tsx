import React from 'react';
import GameModal from './modal';
interface ConfirmModalProps {
  isVisible: boolean;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isVisible,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <GameModal
      isVisible={isVisible}
      onClose={onCancel}
      footer={
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
      }
    >
      {message && <p>{message}</p>}
    </GameModal>
  );
};

export default ConfirmModal;
