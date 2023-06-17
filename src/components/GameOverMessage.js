// GameOverMessage.js

import React from 'react';

const GameOverMessage = ({ onRestart }) => {
  const handleRestart = () => {
    if (typeof onRestart === 'function') {
      onRestart();
    }
  };

  return (
    <div className="game-over-message">
      <h2>Game Over</h2>
      <button onClick={handleRestart}>try again</button>
    </div>
  );
};

export default GameOverMessage;