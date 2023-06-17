import React from 'react';

const Header = ({ onRestart }) => {
  const handleRestart = () => {
    if (typeof onRestart === 'function') {
      onRestart();
    }
  };

  return (
    <header>
      <div className="headcontainer">
        <h1 className="title">2048</h1>
        <div className="score">score</div>
        <div className="best">best</div>
        <button className="restart" onClick={handleRestart}>
          New Game
        </button>
      </div>
    </header>
  );
};

export default Header;
