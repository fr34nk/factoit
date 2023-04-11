import { useCallback, useState } from 'react';
import Log from './services/Logger';
import C from './interfaces/enums/GameContentsEnum';

const useGame = (initialState) => {
  const [state, setValue] = useState(initialState);

  // useCallback memoize the value 
  const setState =  useCallback(x => setValue(x), []);
  return [ state, setState ]
}

export default useGame;

// === Game Logic ===
export function playerClick (state, rowId, squareId) {
  Log.debug("[GAME_STATE_IN]: ")
  Log.debug(JSON.stringify(state, 2, null));

  try {
      // Increment round number
      if (state.round === 10) {
        if (state.winner == null) {
          state.winner = 'Draw';
        }
        return state;
      }
      state.round += 1;

      // calculate new state symbol
      Log.debug('symbol: %s', { s: state.symbol })
      state.symbol = state.symbol && state.symbol === C.PLAYER_1_SYMBOL 
        ? C.PLAYER_2_SYMBOL
        : C.PLAYER_1_SYMBOL;


      state.board = insertPlayOnBoard(state.board, rowId, squareId, state.symbol);

      const playDescription = { round: state.round, player: state.symbol, position: { row: rowId, col: squareId }};
      state.playHistory = [...state.playHistory, playDescription];

      state.winner = resolveGameWinner(state.board);
  } catch (e) {
    Log.error("Some error happended: ", e);
  }

  Log.debug("[GAME_STATE_OUT]: ");
  Log.debug(JSON.stringify(state, 2, null));
                return state;
              }

function insertPlayOnBoard (board, rowId, squareId, symbol) {
  // calculate new state of the board
  for (let i=0; i < board.length; i++) {
    for (let j=0; j < board[i].length; j++) {
        Log.debug(`[${i}][${j}]: ${JSON.stringify(board)}`);
        if (i === rowId && j === squareId) {
          if (board[i][j] !== null) {
            return board;
            }
          Log.debug('Inserting symbol (%symbol), at row (%row) and column (%col)', { symbol, row: i, col: j });
          board[i][j] = symbol;
          return board;
        }
      }
  }
  return board;
}

export function resolveGameWinner (board) {
  // helper to check same value
  const checksame = (xs) => xs.every(x => x === xs[0]) && xs[0];

  const columns=[[],[],[]];
  for (let r=0; r < board.length; r++) {
    let row = board[r];

    // horizontal winner, check row at column idx 
    if (checksame([row[0],row[1],row[2]])) {
      return row[0];
    }

    // columns check
    for (let c=0; c < row.length; c++) {
      columns[c].push(row[c]);
    }
  }

  // columns check
  for (let c=0; c < columns.length; c++) {
    let column = columns[c];
    if (checksame(column)) {
      return column[0];
    }
  }

  // main diagonal
  const md = [board[0][0], board[1][1], board[2][2]];
  if  (checksame(md)) {
    return md[0];
  }

  // secondary diagonal
  const sd = [board[0][2], board[1][1], board[2][0]];
  if  (checksame(sd)) {
    return sd[0];
  }

  // if no winner
  return null;
}