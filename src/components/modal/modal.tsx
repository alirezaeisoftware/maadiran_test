import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
interface GameModalProps {
  isVisible: boolean;
  title?: ReactNode;
  message?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

const GameModal: React.FC<GameModalProps> = ({
  isVisible,
  title,
  message,
  children,
  footer,
  onClose,
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      timer = setTimeout(() => setShow(false), 300);
    }
    return () => {
      clearTimeout(timer);
      setShow(false);
    };
  }, [isVisible]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        animate ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg text-center text-gray-900 dark:text-gray-100 transition-transform duration-300 ${
          animate ? 'scale-100' : 'scale-90'
        }`}
      >
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
        {message && <p className="mb-4">{message}</p>}
        {children}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};

export default GameModal;
