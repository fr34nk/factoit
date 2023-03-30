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
    (row, idx) => <BoardRow key={idx} row={row}/>
  )

  return (
    <div className="board">
      {boardRows}
    </div>
  )
};

function BoardRow ({ row }) {
  const rowSquares = row.map((rowCheck, idx) => <Square key={idx} checked={rowCheck} />)

  return (
      <div className="board-row">
        {rowSquares}
      </div>
  )
}

function Square ({ checked }) {
  return <button className="square">{checked}</button>
}