// GameOverMessage.js

import React from 'react';
import '../Board.css';

const GameOverMessage = ({ onRestart }) => {
  const handleRestart = () => {
    if (typeof onRestart === 'function') {
      onRestart();
    }
  };

  return (
    <div className="game-over-message">
      <h2>Game Over</h2>
      <button className="restart-button" onClick={handleRestart}>try again</button>
    </div>
  );  
};

export default GameOverMessage;