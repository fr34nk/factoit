import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export default function Board () {
  const [state, setState] = useState({
    board: [ [0,0,0], 
             [0,0,0], 
             [0,0,0] ]
  })

  function onSquareClick (rowId, squareId, ev) {
    console.log('rowId: ', );
    console.log(rowId);

    const newState = {...state};
    for (let i=0; i < state.board.length; i++) {
      for (let j=0; j < state.board[i].length; j++) {
          if (i == rowId && j == squareId) {
            newState.board[i][j] = 'X'
          }
      }
    }
    setState(newState);
  }

  const boardRows=state.board.map(
    (squareList, idx) => <BoardRow key={idx} rowId={idx} squares={squareList} onSquareClick={onSquareClick} />
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
        checked={rowCheck} 
        rowId={rowId}
        squareId={idx}
        onClick={onSquareClick}
      />
    )

  return (
      <div className="board-row">
        {squareList}
      </div>
  )
}

function Square ({ checked, rowId, squareId, onClick }) {
  return <button className="square" onClick={onClick.bind(this, rowId, squareId)}>{checked}</button>
}