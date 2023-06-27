// Header.js

import React from 'react';
import "../App.css"

const Header = ({ onRestart, score, bestScore }) => {
  const handleRestart = () => {
    if (typeof onRestart === 'function') {
      onRestart();
    }
  };

  return (
    <header>
      <div className="headcontainer">
        <h1 className="title">2048</h1>
        <div className="score">
          Score: <span>{score}</span>
        </div>
        <div className="best">
          Best: <span>{bestScore}</span>
        </div>
        <button className="restart" onClick={handleRestart}>
          New Game
        </button>
      </div>
    </header>
  );
};

export default Header;