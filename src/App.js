import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function calculateTicTacToeWinner (board) {
  const possibleWinLines=[
    [0, 1, 2]
  ]

  const checkRowFill=(board) => {
    // return board.some((row) => row[0] === row[1] === row[2])
    const result = board.map((row) => {
      if (row[0] === row[1] === row[2]) {
        return row[0];
      }
    })
    return result.filter(x => x!=null)[0];
  }

  checkColumnFills=(board) => {
    let columns=[[],[],[]];
    for (let i=0; i < board.length; i++) {
      for (let j=0; j < board[i].length; j++) {
        columns[j].push(board[i][j])
      }
    }
    console.log(columns)
    // return columns.some((column) => column[0] === column[1] === column[2])
    const result = columns.map((column) => {
      if (column[0] === column[1] === column[2]) {
        return column[0];
      }
    })

    return result.filter(x => x!=null)[0];
  }

  board = [
    ['X','0', '0'],
    ['X','0', '0'],
    ['X','0', '0']
  ]

  const checkDiagonalFill = (board) => {
    let b = board;
    const d1 = [b[0][0], b[1][1], b[2][2]];
    const d2 = [b[0][2], b[1][1], b[2][0]];

  }

/*
  (r, c)
[
  [ (0,0), (0, 1), (0, 2) ]
  [ (1, 0), (1, 1), (1, 2) ]
  [ (2, 0), (2, 1), (2, 2) ]
]

[
  [ 1, 2, 3 ]
  [ 4, 5, 6 ]
  [ 7, 8, 9 ]
]
*/

}



export default function Board () {
  const [state, setState] = useState({
    board: [ [null,null,null], 
             [null,null,null], 
             [null,null,null] ],
    symbol: 'X',
    round: 0
  })

  function onSquareClick (rowId, squareId, ev) {
    console.log('rowId: ', );
    console.log(rowId);

    const newState = {...state};

    // Increment round number
    newState.round += 1;

    // calculate new state of the board
    for (let i=0; i < state.board.length; i++) {
      for (let j=0; j < state.board[i].length; j++) {
          if (i == rowId && j == squareId) {
            if (state.board[i][j] !== null) {
              return
            }

            newState.board[i][j] = state.symbol;
          }
      }
    }

    // calculate new state symbol
    newState.symbol = newState.symbol === 'X' ? '0' : 'X';

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
  return <button className="square" onClick={onClick.bind(this, rowId, squareId)}>
    <p>{checked}</p> 
  </button>
}