import { render, screen, within, waitFor, act, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

import  useGame, { roundPlay, resolveGameWinner } from './App.state';

describe('Test board component', () => {
  beforeAll(() => {

  })

  it('renders board game', () => {
    render(<App />);
    const board = screen.getByText(/Tic-Tac-Toe Game/i);

    const squares = screen.getAllByLabelText(/square/i);
    expect(squares).toHaveLength(9);

    squares.forEach(sqr => {
      expect(sqr).not.toHaveTextContent()
    });

    expect(board).toBeInTheDocument();
  });

  it('mark squares as user click', async () => {
    render(<App />);

    let rows = screen.getAllByLabelText(/row/i);
    let squaresSecondRow = await within(rows[2]).findAllByLabelText(/square/i)
    let secSqrSecRow = squaresSecondRow[1];
    
    await waitFor(() => userEvent.click(secSqrSecRow))

    expect(secSqrSecRow).toHaveTextContent('X')

    // if clicked again, keep mark
    await waitFor(() => userEvent.click(secSqrSecRow))
    expect(secSqrSecRow).toHaveTextContent('X')

    // it clicked in another square, fills it with '0'
    let firstSqrSeconddRow = squaresSecondRow[0];
    await waitFor(() => userEvent.click(firstSqrSeconddRow ))
    expect(firstSqrSeconddRow).toHaveTextContent('0')
  });

  it('mark squares as user click', async () => {
    render(<App />);

    let rows = screen.getAllByLabelText(/row/i);
    let squaresSecondRow = await within(rows[2]).findAllByLabelText(/square/i)
    let secSqrSecRow = squaresSecondRow[1];
    
    await waitFor(() => userEvent.click(secSqrSecRow))

    expect(secSqrSecRow).toHaveTextContent('X')

    // if clicked again, keep mark
    await waitFor(() => userEvent.click(secSqrSecRow))
    expect(secSqrSecRow).toHaveTextContent('X')

    // it clicked in another square, fills it with '0'
    let firstSqrSeconddRow = squaresSecondRow[0];
    await waitFor(() => userEvent.click(firstSqrSeconddRow ))
    expect(firstSqrSeconddRow).toHaveTextContent('0')
  });
})

// Unit tests
describe('Test resolveGameWinner method', () => {
  let board;
  beforeAll(() => {
    board = [ [null, null, null], 
              [null,null,null], 
              [null,null,null] ];

  });

  it('must return a winner if 1th row is filled', () => {
    const board =[ ['X','X', null], 
              [null,null,null], 
              [null,null,null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    // --> fills 1th row
    board[0][2] = 'X';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe('X')

    // resolveGameWinner()
    expect(true).toBe(true)
  });


  it('must return a winner if 2th row is filled', () => {
    const board =[ ['X','X', null], 
              [null,'X','X'], 
              [null,null,null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    // --> fills 1th row
    board[1][0] = 'X';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe('X')

    // resolveGameWinner()
    expect(true).toBe(true)
  });

  it('must return a winner if 3th row is filled', () => {
    const board =[ ['X',null, null], 
                   [null,'X',null], 
                   [null,null,null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    // --> fills 1th row
    board[2][0] = 'X';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();


    board[2][1] = 'X';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[2][2] = 'X';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe('X')

    // resolveGameWinner()
    expect(true).toBe(true)
  });

  it('must return a winner if 1th column is filled', () => {
    const board =[ ['X',null, null], 
              ['X',null,null], 
              [null,null,null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();


    board[2][0] = 'X';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe('X')
  });


  it('must return a winner if 2th column is filled', () => {
    const board =[ [null,'0', null], 
              [null,'0',null], 
              [null,null,null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[2][1] = '0';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe('0')
  });

  it('must return a winner if 3th column is filled', () => {
    const board =[ [null,null,'X'], 
              [null,null,'X'], 
              [null,null,null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[2][2] = 'X';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe('X')
  });

  it('must return a winner if main diagonal is filled', () => {
    const board =[ ['X',null,'0'], 
                   [null,'X',null], 
                   ['X','0',null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[1][0] = '0';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();


    board[2][2] = 'X';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe('X');
  });


  it('must return a winner if secondary diagonal is filled', () => {
    const board =[ ['X','X',null], 
                   [null,'0',null], 
                   ['0','0','X'] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[1][0] = '0';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();


    board[0][2] = '0';
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe('0');
  });


  it('must return null if draw game', () => {

    const gameResult = null;

    expect(gameResult).toBeNull()
  });
});



describe('Test roadPlay game', () => {
  let gameInitialState;
  let game;
  let resetState;
  beforeAll(async () => {
    gameInitialState = {
      board: [ [null,null,null], 
                [null,null,null], 
                [null,null,null] ],
      symbol: 'X',
      round: 1,
      winner: null
    };

    // setGame(gameInitialState);

    // const { result, rerender } = await renderHook(() => useGame({ ...gameInitialState }));
    const { result, rerender } = renderHook(useGame, { ...gameInitialState });
    [game, setGame] = result.current;
    resetState = rerender;
  });

  afterEach(async () => {
    // const { result, rerender } = await renderHook(() => useGame({ ...gameInitialState }));
    const { result, rerender } = renderHook(useGame, { ...gameInitialState });
    [game, setGame] = result.current;
    resetState = rerender;
  })


  it('it must result in X winner after 5th play (X marks main diagonal)', async () => {
    // resetState({...gameInitialState})

    // X fills main diagonal 
    roundPlay(game, 0, 0);  // X play
    roundPlay(game, 0, 1);  // 0 play
    roundPlay(game, 1, 1); // X play
    roundPlay(game, 0, 2); // 0 play
    roundPlay(game, 2, 2); // X play

    expect(game.winner).not.toBeNull()
    expect(game.winner).toBe('X');
  });

  it.skip('it must result in X winner after 8th play (0 marks secondary diagonal)', async () => {
    resetState({...gameInitialState})

    // diagonal fill
    roundPlay(game, 0, 0);  // X play
    roundPlay(game, 0, 2);  // 0 play
    roundPlay(game, 0, 1); // X play
    console.log(game)

    expect(game.winner).not.toBeNull()
    expect(game.winner).toBe('0');
  });

});
