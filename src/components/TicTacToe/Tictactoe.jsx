import { useState } from "react";
import "./tictactoe.css"
import useTicTacToe from "./hooks/tic-tac-toe";
const Tictactoe = ({size=3}) => {

  const {board, resetGame, handleClick, getStatusMessage} = useTicTacToe(size);

  return(
    <div className="game" style={{ maxWidth: `calc(${size} * 100px)` }}>
      <div className="game-header">
        <div className="status">{getStatusMessage()}</div>
        <button className="reset" onClick={resetGame}>Reset Game</button>
      </div>

      <div className="game-board" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        { 
          board.map((b,index) => {
            return (
              <button 
                className="cell" 
                key={index} 
                onClick={() => handleClick(index)}
                disabled= {b!==null}
              >
                {b}
              </button>
            )
          })
        }
      </div>
    </div>
  )
};

export default Tictactoe;