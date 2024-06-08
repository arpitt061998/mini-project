import { useState } from "react";

const initialBoard = (size) => Array(size*size).fill(null);

const generateWinningPatterns = (size) => {
  const patterns = [];

  // Rows
  for (let row = 0; row < size; row++) {
    const pattern = [];
    for (let col = 0; col < size; col++) {
      pattern.push(row * size + col);
    }
    patterns.push(pattern);
  }

  // Columns
  for (let col = 0; col < size; col++) {
    const pattern = [];
    for (let row = 0; row < size; row++) {
      pattern.push(row * size + col);
    }
    patterns.push(pattern);
  }

  // Diagonal (top-left to bottom-right)
  const diagonal1 = [];
  for (let i = 0; i < size; i++) {
    diagonal1.push(i * size + i);
  }
  patterns.push(diagonal1);

  // Diagonal (top-right to bottom-left)
  const diagonal2 = [];
  for (let i = 0; i < size; i++) {
    diagonal2.push(i * size + (size - 1 - i));
  }
  patterns.push(diagonal2);

  return patterns;
};

const useTicTacToe = (size = 3) => {
  const [board, setBoard] = useState(initialBoard(size));
  const [isXNext, setIsXNext] = useState(true);
  const WINNING_PATTERNS = generateWinningPatterns(size);

  const calulateWinner = (currentBoard) => {
    console.log(currentBoard);
    for(let i=0; i< WINNING_PATTERNS.length;i++) {
      const pattern = WINNING_PATTERNS[i];
      const [first, ...rest] = pattern;
      if(currentBoard[first] && rest.every(index => currentBoard[first] === currentBoard[index])) {
        return currentBoard[first];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calulateWinner(board);
    console.log("Winner is",winner)
    if(winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext)
  };

  const getStatusMessage = () => {
    const winner = calulateWinner(board);
    if(winner) return `Player ${winner} wins`;
    if(!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  const resetGame = () => {
    setBoard(initialBoard(size));
    setIsXNext(true)
  };

  return {board, handleClick,  calulateWinner, getStatusMessage, resetGame}

}

export default useTicTacToe;