import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export default function Board () {
  const [state, setState] = useState({
    board: [ [0,0,0], 
             [0,0,0], 
             [0,0,0] ]
  })


  const boardRows=state.board.map(
    (squareList, idx) => <BoardRow key={idx} rowId={idx} squares={squareList}/>
  )

  return (
    <div className="board">
      {boardRows}
    </div>
  )
};

function BoardRow ({ squares, rowId, onSquareClick }) {
  const squareList = squares.map(
    (rowCheck, idx) => 
      <Square 
        key={idx} 
        rowId={rowId} 
        squareId={idx} 
        checked={rowCheck} 
        onClick={onSquareClick}
      />
    )

  return (
      <div className="board-row">
        {squareList}
      </div>
  )
}

function Square ({ checked }) {
  return <button className="square">{checked}</button>
}