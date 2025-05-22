import React from "react";

type GridProps = {
  rows: number;
  cols: number;
  baseColor: string;
  diffColor: string;
  diffIndex: number;
  onCellClick: (idx: number) => void;
};

const Grid: React.FC<GridProps> = ({
  rows,
  cols,
  baseColor,
  diffColor,
  diffIndex,
  onCellClick,
}) => {
  const total = rows * cols;

  return (
    <div
      className="mt-3 grid w-full max-w-5xl mx-auto"
      style={{
        gap: "1px",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          onClick={() => onCellClick(idx)}
          className="w-full aspect-square cursor-pointer transition-colors duration-300"
          style={{
            backgroundColor: idx === diffIndex ? diffColor : baseColor,
          }}
        />
      ))}
    </div>
  );
};

export default Grid;
