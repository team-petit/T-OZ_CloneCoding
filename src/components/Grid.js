import React from 'react';
import Tile from './Tile';
import '../Grid.css';

const Grid = ({ board }) => {
  if (!board || board.length === 0) {
    board = []; // board 값이 null인 경우 빈 배열로 초기화
  }

  return (
    <div className="grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, cellIndex) => (
            <Tile key={cellIndex} value={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
