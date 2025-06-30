
import React, { useState } from "react";
import "../styles.css";

const Game = ({ boardSize, winLength }) => {
  const createBoard = () =>
    Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null));

  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [status, setStatus] = useState("Player X's turn");
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (board, row, col, player) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1], 
    ];

    for (let [dx, dy] of directions) {
      let count = 1;

      for (let dir = -1; dir <= 1; dir += 2) {
        let x = row + dx * dir;
        let y = col + dy * dir;

        while (
          x >= 0 &&
          x < boardSize &&
          y >= 0 &&
          y < boardSize &&
          board[x][y] === player
        ) {
          count++;
          x += dx * dir;
          y += dy * dir;
        }
      }

      if (count >= winLength) return true;
    }

    return false;
  };

  const handleClick = (row, col) => {
    if (gameOver || board[row][col]) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;

    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setStatus(`Player ${currentPlayer} wins! `);
      setGameOver(true);
    } else if (newBoard.flat().every((cell) => cell)) {
      setStatus("It's a draw!");
      setGameOver(true);
    } else {
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setStatus(`Player ${nextPlayer}'s turn`);
    }

    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer("X");
    setStatus("Player X's turn");
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h2>{status}</h2>
      <div className="board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => (
              <button
                key={cIdx}
                className="cell"
                onClick={() => handleClick(rIdx, cIdx)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        Reset
      </button>
      <p style={{ marginTop: "20px", fontSize: "14px", color: "#888" }}>
        This game is made by <strong>Pankaj Joshi</strong>
      </p>
    </div>
  );
};

export default Game;
