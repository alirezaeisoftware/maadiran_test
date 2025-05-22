import React from "react";
import Game from "./components/game/game";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 ease-in-out">
      <Game />
    </div>
  );
};

export default App;
