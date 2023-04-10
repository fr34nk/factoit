import './App.css';
import Log from './services/Logger';
import useGame, { roundPlay } from './App.state';


const boardInitialState = {
  board: Array(3).fill(Array(3).fill(null)),
  symbol: 'X',
  round: 1,
  winner: null
}

export default function Game () {
  Log.debug('Start game');

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{0}</ol>
      </div>
    </div>
  )
}

function Board () {
  Log.debug('Rendered Game');
  const [state, setState] = useGame(boardInitialState);

  function onSquareClick (rowId, squareId, ev) {
    Log.debug('Square on row %row and column %column was clicked', { row: rowId, column: squareId });

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
  Log.debug(`Row ${rowId} was rendered`);

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
  Log.debug(`Column %col was rendered`, { col: squareId });

  return <button aria-label="square" className="square" onClick={onClick.bind(this, rowId, squareId)}>
    <p>{checked}</p> 
  </button>
}