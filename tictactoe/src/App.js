import { useState } from 'react';
import React from 'react';
import './App.css';


function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);

  const [currentPlayer, setCurrentPlayer] = useState("X");

  function printBoard() {
    return (
      <table id="board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} onClick={() => cellClicked(rowIndex, colIndex)}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return true;
      }
      if (board[0][i] !== "" && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        return true;
      }
    }

    if (board[0][0] !== "" && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return true;
    }
    if (board[0][2] !== "" && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return true;
    }

    return false;
  };

  const isBoardFull = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  };

  const cellClicked = (row, col) => {
    if (board[row][col] === "") {
      const newBoard = [...board];
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);

      if (checkWinner()) {
        alert("Player " + currentPlayer + " wins!");
        resetGame();
      } else if (isBoardFull()) {
        alert("It's a tie!");
        resetGame();
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const resetGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    setCurrentPlayer("X");
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {printBoard()}
    </div>
  );
}

export default App;
