import './App.css';
import Log from './services/Logger';
import useGame, { playerClick } from './App.state';
import C from './interfaces/enums/GameContentsEnum';

const boardInitialState = {
  board: [  
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ],
  playHistory: [],
  symbol: null,
  round: 0,
  winner: null
}

export default function Game () {
  const [state, setState] = useGame(boardInitialState);

  function onSquareClick (rowId, squareId, ev) {
    Log.debug('Square on row %row and column %column was clicked', { row: rowId, column: squareId });
    // bug: using innerHTML because when invoking  userClick lib react-testing-library/user-event'  
    // innerText is returning null even when its filled, while debugging on browser, innerText returns
    // expected result;
    const squareHTMLContent = ev.target.innerHTML;
    const squareContent = squareHTMLContent.replace(/<\/?p>/g, ''); // strip-off <p>

    // if already filled, just dont update state 
    if ([C.PLAYER_1_SYMBOL, C.PLAYER_2_SYMBOL].includes(squareContent)) {
      return;
    }

    const stateReference = { ...state };
    let resultState = playerClick(stateReference, rowId, squareId)
    setState(resultState);
  }

  return (
    <div className="game">
      <h2>Tic-Tac-Toe Game</h2>
      <div className="container-control">
        <HistoryCtrlLeft />
        <div className="game-board">
          <Board onSquareClick={onSquareClick} state={state}/>
        </div>
        <HistoryCtrlRight/>
      </div>
      <HistoryInfo playHistory={state.playHistory}/>
    </div>
  )
}

function Board ({ state, onSquareClick }) {
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


// === History Info control === 
function HistoryInfo ({ playHistory=[] }) {
  const historyInfoList = playHistory.map((info) => {
    const { round, player, position: { row, col  } } = info;
    const rowPosition = row + 1;
    const colPosition = col + 1;


    return (
        <div key={round} className="round">
          <div className="play">Round {round}: </div>
          <div className="description">
            <p aria-label="round-play"> Player {player} played on [{rowPosition}][{colPosition}] </p>
          </div>
        </div>
    )
  })

  return (
      <div className="game-info">
        <h4>Round Plays</h4>
        <ul className="container-round" aria-label="container-round">
          {historyInfoList} 
        </ul>
      </div>
  )
}


function HistoryCtrlLeft () {
  return (
    <div className='control arrow container'>
      <div className="arrow-left" aria-label="control-left-arrow"> &lt; </div>
    </div>
  )
}

function HistoryCtrlRight () {
  return (
    <div className='control arrow container'>
      <div className="arrow-right" aria-label="control-right-arrow"> &gt; </div>
    </div>
  )
}
