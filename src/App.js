import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import GameOverMessage from './components/GameOverMessage';
import "./App.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const placeRandomTile = (board) => {
  const emptyTiles = [];

  // 빈 타일의 좌표를 수집
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        emptyTiles.push({ row, col });
      }
    }
  }

  // 빈 타일이 없으면 종료
  if (emptyTiles.length === 0) {
    return board;
  }

  // 랜덤한 빈 타일 선택
  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const { row, col } = emptyTiles[randomIndex];

  // 랜덤한 값을 2 또는 4로 설정
  const randomValue = Math.random() < 0.9 ? 2 : 4;

  // 선택된 빈 타일에 값 할당
  const newBoard = [...board];
  newBoard[row][col] = randomValue;

  return newBoard;
};

const initializeBoard = () => {
  const board = [];

  // 4x4 보드 생성
  for (let i = 0; i < 4; i++) {
    board.push([0, 0, 0, 0]);
  }

  // 랜덤한 위치에 초기 타일 생성
  const newBoard = placeRandomTile(placeRandomTile(board));

  return newBoard;
};

const calculateScore = (board) => {
  let totalScore = 0;

  // 보드 타일의 합을 계산
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      totalScore += board[row][col];
    }
  }

  return totalScore;
};

const App = () => {
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState();

  const moveLeft = () => {
    const newBoard = board.map(row => [...row]);

    for (let row = 0; row < 4; row++) {
      for (let col = 1; col < 4; col++) {
        if (newBoard[row][col] !== 0) {
          let currentCol = col;
          while (currentCol > 0 && (newBoard[row][currentCol - 1] === 0 || newBoard[row][currentCol - 1] === newBoard[row][currentCol])) {
            if (newBoard[row][currentCol - 1] === newBoard[row][currentCol]) {
              newBoard[row][currentCol - 1] *= 2;
              newBoard[row][currentCol] = 0;
              break;
            } else if (newBoard[row][currentCol - 1] === 0) {
              newBoard[row][currentCol - 1] = newBoard[row][currentCol];
              newBoard[row][currentCol] = 0;
              currentCol--;
            }
          }
        }
      }
    }

    const updatedBoard = placeRandomTile(newBoard);
    setBoard(updatedBoard);
  };

  const moveRight = () => {
    const newBoard = board.map(row => [...row]);

    for (let row = 0; row < 4; row++) {
      for (let col = 2; col >= 0; col--) {
        if (newBoard[row][col] !== 0) {
          let currentCol = col;
          while (currentCol < 3 && (newBoard[row][currentCol + 1] === 0 || newBoard[row][currentCol + 1] === newBoard[row][currentCol])) {
            if (newBoard[row][currentCol + 1] === newBoard[row][currentCol]) {
              newBoard[row][currentCol + 1] *= 2;
              newBoard[row][currentCol] = 0;
              break;
            } else if (newBoard[row][currentCol + 1] === 0) {
              newBoard[row][currentCol + 1] = newBoard[row][currentCol];
              newBoard[row][currentCol] = 0;
              currentCol++;
            }
          }
        }
      }
    }

    const updatedBoard = placeRandomTile(newBoard);
    setBoard(updatedBoard);
  };

  const moveUp = () => {
    const newBoard = board.map(row => [...row]);

    for (let col = 0; col < 4; col++) {
      for (let row = 1; row < 4; row++) {
        if (newBoard[row][col] !== 0) {
          let currentRow = row;
          while (currentRow > 0 && (newBoard[currentRow - 1][col] === 0 || newBoard[currentRow - 1][col] === newBoard[currentRow][col])) {
            if (newBoard[currentRow - 1][col] === newBoard[currentRow][col]) {
              newBoard[currentRow - 1][col] *= 2;
              newBoard[currentRow][col] = 0;
              break;
            } else if (newBoard[currentRow - 1][col] === 0) {
              newBoard[currentRow - 1][col] = newBoard[currentRow][col];
              newBoard[currentRow][col] = 0;
              currentRow--;
            }
          }
        }
      }
    }

    const updatedBoard = placeRandomTile(newBoard);
    setBoard(updatedBoard);
  };

  const moveDown = () => {
    const newBoard = board.map(row => [...row]);

    for (let col = 0; col < 4; col++) {
      for (let row = 2; row >= 0; row--) {
        if (newBoard[row][col] !== 0) {
          let currentRow = row;
          while (currentRow < 3 && (newBoard[currentRow + 1][col] === 0 || newBoard[currentRow + 1][col] === newBoard[currentRow][col])) {
            if (newBoard[currentRow + 1][col] === newBoard[currentRow][col]) {
              newBoard[currentRow + 1][col] *= 2;
              newBoard[currentRow][col] = 0;
              break;
            } else if (newBoard[currentRow + 1][col] === 0) {
              newBoard[currentRow + 1][col] = newBoard[currentRow][col];
              newBoard[currentRow][col] = 0;
              currentRow++;
            }
          }
        }
      }
    }

    const updatedBoard = placeRandomTile(newBoard);
    setBoard(updatedBoard);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!gameOver) {
        if (event.key === "ArrowLeft") {
          moveLeft();
        } else if (event.key === "ArrowRight") {
          moveRight();
        } else if (event.key === "ArrowUp") {
          moveUp();
        } else if (event.key === "ArrowDown") {
          moveDown();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [board, gameOver]);

  useEffect(() => {
    const checkGameOver = () => {
      let isGameOver = true;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (board[row][col] === 0) {
            isGameOver = false;
            break;
          }
          if (row < 3 && board[row][col] === board[row + 1][col]) {
            isGameOver = false;
            break;
          }
          if (col < 3 && board[row][col] === board[row][col + 1]) {
            isGameOver = false;
            break;
          }
        }
      }
      setGameOver(isGameOver);
    };

    checkGameOver();
  }, [board]);

  const handleRestart = () => {
    setGameOver(false);
    setBoard(initializeBoard());
    setScore(0);
  };

  useEffect(() => {
    const updatedScore = calculateScore(board);
    setScore(updatedScore);
    if (updatedScore > bestScore) {
      // firebase 저장 기능
      const db = firebase.firestore();
      db.collection('scoreboard').doc("scores").update({"bestscore" : updatedScore});
      setBestScore(updatedScore);
    }
  }, [board]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('scoreboard').get().then((result)=>{
      result.forEach((doc)=>{
      setBestScore(Object.values(doc.data())[0]);
      })
  })},[]);

  return (
    <div className="app-container">
      <Header onRestart={handleRestart} score={score} bestScore={bestScore} />
      <Board
        board={board}
        moveLeft={moveLeft}
        moveRight={moveRight}
        moveUp={moveUp}
        moveDown={moveDown}
      />
      {gameOver && <GameOverMessage onRestart={handleRestart}/>}
    </div>
  );
};

export default App;
