import { useEffect, useState } from "react";
import { BASE_COLORS, getDifferentColor } from "../../utils/colorUtils";

export function useGameLogic() {
  const [level, setLevel] = useState<number | null>(null);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(3);
  const [diffIndex, setDiffIndex] = useState(0);
  const [baseColor, setBaseColor] = useState(BASE_COLORS[0]);
  const [diffColor, setDiffColor] = useState("");
  const [colorGroup, setColorGroup] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  useEffect(() => {
    const savedLevel = localStorage.getItem("game-level");
    const savedIndex = localStorage.getItem("diff-index");
    const savedColor = localStorage.getItem("diff-color");

    setLevel(savedLevel ? parseInt(savedLevel) : 0);
    if (savedIndex) setDiffIndex(parseInt(savedIndex));
    if (savedColor) setDiffColor(savedColor);
  }, []);

  useEffect(() => {
    if (level === null) return;
    localStorage.setItem("game-level", level.toString());

    const newGroup = Math.floor(level / 3);
    if (newGroup !== colorGroup) setColorGroup(newGroup);

    const base = BASE_COLORS[newGroup % BASE_COLORS.length];
    setBaseColor(base);

    const r = Math.min(3 + newGroup, 9);
    const c = Math.min(4 + newGroup * 2, 16);
    setRows(r);
    setCols(c);

    const step = level % 3;
    let difficulty;
    if (step === 0) difficulty = 8;
    else if (step === 1) difficulty = 5;
    else difficulty = 3;

    const difficultyWithLevel = difficulty + Math.floor(level / 4);

    const total = r * c;
    const storedDiffColor = localStorage.getItem("diff-color");
    const storedDiffIndex = localStorage.getItem("diff-index");

    if (!storedDiffColor || !storedDiffIndex) {
      const newDiffColor = getDifferentColor(base, difficultyWithLevel);
      const newDiffIndex = Math.floor(Math.random() * total);
      setDiffColor(newDiffColor);
      setDiffIndex(newDiffIndex);
      localStorage.setItem("diff-color", newDiffColor);
      localStorage.setItem("diff-index", newDiffIndex.toString());
    }
  }, [level, colorGroup]);

  const handleClick = (idx: number) => {
    if (idx === diffIndex) {
      if (level! < 20) setShowModal(true);
      else {
        setIsGameFinished(true);
        setShowModal(true);
      }
    } else setShowWrongModal(true);
  };

  const handleNextLevel = () => {
    localStorage.removeItem("diff-color");
    localStorage.removeItem("diff-index");
    setLevel((prev) => (prev !== null ? prev + 1 : 0));
    setShowModal(false);
  };

  const handleRepeatLevel = () => {
    setShowModal(false);
    setIsGameFinished(false);
  };

  const handleRestart = () => {
    localStorage.clear();
    setLevel(0);
    setDiffColor("");
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
