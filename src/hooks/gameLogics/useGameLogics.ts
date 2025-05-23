import { useEffect, useMemo, useState } from 'react';
import { BASE_COLORS, getDifferentColor } from '../../utils/colorUtils';

export function useGameLogic() {
  const [level, setLevel] = useState<number>(() => {
    const saved = localStorage.getItem('game-level');
    const parsed = parseInt(saved || '', 10);
    return isNaN(parsed) ? 0 : parsed;
  });

  const [diffIndex, setDiffIndex] = useState(() => {
    const saved = localStorage.getItem('diff-index');
    const parsed = parseInt(saved || '', 10);
    return isNaN(parsed) ? 0 : parsed;
  });

  const [showModal, setShowModal] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  const colorGroup = Math.floor(level / 3);

  const baseColor = useMemo(() => {
    return BASE_COLORS[colorGroup % BASE_COLORS.length];
  }, [colorGroup]);

  const rows = useMemo(() => Math.min(3 + colorGroup, 9), [colorGroup]);
  const cols = useMemo(() => Math.min(4 + colorGroup * 2, 16), [colorGroup]);

  const difficultySteps = [8, 7, 6, 5, 4, 3, 2];
  const difficultyIndex = Math.min(colorGroup, difficultySteps.length - 1);
  const difficulty = difficultySteps[difficultyIndex];

  const diffColor = useMemo(() => {
    return getDifferentColor(baseColor, difficulty);
  }, [baseColor, difficulty]);

  useEffect(() => {
    localStorage.setItem('game-level', level.toString());

    const total = rows * cols;
    const newDiffIndex = Math.floor(Math.random() * total);

    setDiffIndex(newDiffIndex);
    localStorage.setItem('diff-index', newDiffIndex.toString());
    localStorage.setItem('diff-color', diffColor);
  }, [level, rows, cols, diffColor]);

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
    setLevel((prev) => (prev !== null ? prev + 1 : 0));
    setShowModal(false);
  };

  const handleRepeatLevel = () => {
    setShowModal(false);
    setIsGameFinished(false);
  };

  const handleRestart = () => {
    localStorage.removeItem('game-level');
    setLevel(0);
    setDiffIndex(0);
    setIsGameFinished(false);
    setShowModal(false);
  };

  const closeWrongModal = () => setShowWrongModal(false);
  const closeSuccessModal = () => setShowModal(false);
  const openSuccessModal = () => setShowModal(true);

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
    closeWrongModal,
    closeSuccessModal,
    openSuccessModal,
  };
}
