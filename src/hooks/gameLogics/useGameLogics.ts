import { useEffect, useState } from 'react';
import { BASE_COLORS, getDifferentColor } from '../../utils/colorUtils';

export function useGameLogic() {
  const [level, setLevel] = useState<number>(() => {
    const saved = localStorage.getItem('game-level');
    return saved ? parseInt(saved) : 0;
  });
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(3);
  const [diffIndex, setDiffIndex] = useState(() => {
    const saved = localStorage.getItem('diff-index');
    return saved ? parseInt(saved) : 0;
  });
  const [baseColor, setBaseColor] = useState(BASE_COLORS[0]);
  const [diffColor, setDiffColor] = useState(
    () => localStorage.getItem('diff-color') || ''
  );
  const [colorGroup, setColorGroup] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  useEffect(() => {
    if (level === null) return;

    localStorage.setItem('game-level', level.toString());

    const newGroup = Math.floor(level / 3);
    if (newGroup !== colorGroup) setColorGroup(newGroup);

    const base = BASE_COLORS[newGroup % BASE_COLORS.length];
    setBaseColor(base);

    const r = Math.min(3 + newGroup, 9); 
    const c = Math.min(4 + newGroup * 2, 16); 
    setRows(r);
    setCols(c);

    const difficultySteps = [8, 7, 6, 5, 4, 3, 2];
    const difficultyIndex = Math.min(newGroup, difficultySteps.length - 1);
    const difficulty = difficultySteps[difficultyIndex];

    const total = r * c;

    const newDiffColor = getDifferentColor(base, difficulty);
    const newDiffIndex = Math.floor(Math.random() * total);

    setDiffColor(newDiffColor);
    setDiffIndex(newDiffIndex);

    
  }, [level]);

  const handleClick = (idx: number) => {
    if (idx === diffIndex) {
      if (level < 20) {
        setShowModal(true);
      } else {
        setIsGameFinished(true);
        setShowModal(true);
      }
    } else {
      setShowWrongModal(true);
    }
  };

  const handleNextLevel = () => {
    localStorage.removeItem('diff-color');
    localStorage.removeItem('diff-index');
    setLevel((prev) => (prev !== null ? prev + 1 : 0));
    setShowModal(false);
  };

  const handleRepeatLevel = () => {
    setShowModal(false);
    setIsGameFinished(false);
  };

  const handleRestart = () => {
    localStorage.removeItem('game-level');
    localStorage.removeItem('diff-color');
    localStorage.removeItem('diff-index');

    setLevel(0);
    setDiffColor('');
    setDiffIndex(0);
    setIsGameFinished(false);
    setShowModal(false);
  };

  return {
    level,
    rows,
    cols,
    baseColor,
    diffColor,
    diffIndex,
    showModal,
    showWrongModal,
    isGameFinished,
    handleClick,
    handleNextLevel,
    handleRepeatLevel,
    handleRestart,
    resetGame: handleRestart,
    closeWrongModal: () => setShowWrongModal(false),
  };
}
