import React, { useEffect } from 'react';
import Grid from './Grid';

const Board = ({ board, gameOver, initializeBoard, moveUp, moveDown, moveLeft, moveRight }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        moveUp();
      } else if (event.key === 'ArrowDown') {
        moveDown();
      } else if (event.key === 'ArrowLeft') {
        moveLeft();
      } else if (event.key === 'ArrowRight') {
        moveRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveUp, moveDown, moveLeft, moveRight]);

  return (
    <div className="board">
      <Grid board={board} />
    </div>
  );
};

export default Board;
