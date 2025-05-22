import React from 'react';

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

  return (
    <div
      className="mt-3 grid w-full max-w-5xl mx-auto"
      style={{
        gap: gap,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          onClick={() => onCellClick(idx)}
          className={`w-full aspect-square cursor-pointer transition-colors duration-300 ${
            cellShape === 'circle' ? 'rounded-full' : 'rounded-none'
          }`}
          style={{
            backgroundColor: idx === diffIndex ? diffColor : baseColor,
          }}
        />
      ))}
    </div>
  );
};

export default Grid;
