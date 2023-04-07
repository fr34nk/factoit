import './App.css';
import useGame, { roundPlay } from './App.state';

const boardInitialState = {
  board: [ [null,null,null], 
            [null,null,null], 
            [null,null,null] ],
  symbol: 'X',
  round: 1,
  winner: null
}

export default function Board () {
  const [state, setState] = useGame(boardInitialState);

  function onSquareClick (rowId, squareId, ev) {
    const stateReference = { ...state };
    let resultState = roundPlay(stateReference, rowId, squareId)
    setState(resultState);
  }

  const boardRows=state.board.map(
    (squareList, idx) => <BoardRow key={idx} rowId={idx} squares={squareList} onSquareClick={onSquareClick} />
  )

  return (
    <div className="board">
      <h2>Tic-Tac-Toe Game</h2>
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
      <div className="board-row" aria-label='row'>
        {squareList}
      </div>
  )
}

function Square ({ checked, rowId, squareId, onClick }) {
  return <button aria-label="square" className="square" onClick={onClick.bind(this, rowId, squareId)}>
    <p>{checked}</p> 
  </button>
}