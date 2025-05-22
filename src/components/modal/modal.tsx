import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg text-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
