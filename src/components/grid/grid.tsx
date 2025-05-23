import React, { useState } from 'react';

type GridProps = {
  rows: number;
  cols: number;
  baseColor: string;
  diffColor: string;
  diffIndex: number;
  onCellClick: (idx: number) => void;
  gap?: string;
  cellShape?: 'square' | 'circle';
};

const Grid: React.FC<GridProps> = ({
  rows,
  cols,
  baseColor,
  diffColor,
  diffIndex,
  onCellClick,
  gap = '1px',
  cellShape = 'square',
}) => {
  const total = rows * cols;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState(false);

  const handleClick = (idx: number) => {
    setSelectedIndex(idx);
    const wasCorrect = idx === diffIndex;
    setIsWrong(!wasCorrect);

    onCellClick(idx);

    if (!wasCorrect) {
      setTimeout(() => {
        setIsWrong(false);
        setSelectedIndex(null);
      }, 500); // انیمیشن رو بعد از 0.5 ثانیه پاک می‌کنیم
    }
  };

  if (total === 0) return null;

  return (
    <div
      className="mt-3 grid w-full max-w-5xl mx-auto"
      style={{
        gap,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: total }).map((_, idx) => {
        const isDiff = idx === diffIndex;
        const isActive = idx === selectedIndex && isWrong;

        return (
          <div
            key={idx}
            tabIndex={0}
            onClick={() => handleClick(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleClick(idx);
            }}
            className={`w-full aspect-square cursor-pointer transition-colors duration-300 
              ${cellShape === 'circle' ? 'rounded-full' : 'rounded-none'}
              ${isActive ? 'animate-shake' : ''}
            `}
            style={{
              backgroundColor: isDiff ? diffColor : baseColor,
            }}
          />
        );
      })}
    </div>
  );
};

export default React.memo(Grid);
