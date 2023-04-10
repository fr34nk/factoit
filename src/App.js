import './App.css';
import Log from './services/Logger';
import useGame, { playerClick } from './App.state';
import C from './interfaces/enums/GameContentsEnum';


const boardInitialState = {
  board: [  
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  symbol: null,
  round: 1,
  winner: null
}

export default function Game () {
  return (
    <div className="game">
      <h2>Tic-Tac-Toe Game</h2>
      <div className="container-control">
        <div className='control arrow container'>
          <div className="arrow-left" aria-label="control-left-arrow"> &lt; </div>
        </div>
        <div className="game-board">
          <Board />
        </div>
        <div className='control arrow container'>
          <div className="arrow-right" aria-label="control-right-arrow"> &gt; </div>
        </div>
      </div>
      <div className="game-info">
        <h4>Round Plays</h4>
        <ul className="container-round" aria-label="container-round">

          <div className="round" aria-label="round-play">
            <div className="play">Round 1: </div>
            <div className="description">Player 1 put a {C.PLAYER_1_SYMBOL} on square k,z</div>
          </div>

          <div className="round" aria-label="round-play">
            <div className="play">Round 1: </div>
            <div className="description">Player 1 put a {C.PLAYER_1_SYMBOL} on square k,z</div>
          </div>

          <div className="round" aria-label="round-play">
            <div className="play">Round 1: </div>
            <div className="description">Player 1 put a {C.PLAYER_1_SYMBOL} on square k,z</div>
          </div>

        </ul>
      </div>
    </div>
  )
}

function Board () {
  const [state, setState] = useGame(boardInitialState);

  function onSquareClick (rowId, squareId, ev) {
    Log.debug('Square on row %row and column %column was clicked', { row: rowId, column: squareId });
    const squareContent = ev.target.innerText;

    // if already filled, just dont update state 
    if ([C.PLAYER_1_SYMBOL, C.PLAYER_2_SYMBOL].includes(squareContent)) {
      return
    }

    const stateReference = { ...state };
    let resultState = playerClick(stateReference, rowId, squareId)
    setState(resultState);
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