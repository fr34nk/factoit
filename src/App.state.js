import { useCallback, useState } from 'react';


const useGame = (initialState, rowId, colId) => {
  const [state, setValue] = useState(initialState);
  // useCallback memoize the value 
  const setState =  useCallback(x => setValue(x), []);
  return [ state, setState ]
}

export default useGame;


// === Game Logic ===
export function roundPlay (state, rowId, squareId) {
  try {
      // Increment round number
      if (state.round === 9) {
        return state;
      }
      state.round += 1;

      // calculate new state of the board
      for (let i=0; i < state.board.length; i++) {
        for (let j=0; j < state.board[i].length; j++) {
            if (i == rowId && j == squareId) {
              if (state.board[i][j] !== null) {
                return state;
              }

              state.board[i][j] = state.symbol;
            }
        }
      }
      state.winner = resolveGameWinner(state.board);
      // calculate new state symbol
      state.symbol = state.symbol === 'X' ? '0' : 'X';
  } catch (e) {
    console.error("Some error happended: ", e);
  }
  return state;
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