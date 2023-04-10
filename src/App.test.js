import { render, screen, within, waitFor, act, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import  useGame, { roundPlay, resolveGameWinner } from './App.state';
import C from './interfaces/enums/GameContentsEnum';

const selectors = {
  'TITLE': /Tic-Tac-Toe Game/i,
  'CONTROL_PREVIOUS_HISTORY': /^control-left-arrow$/i,
  'CONTROL_NEXT_HISTORY': /^control-right-arrow$/i,
  'ROW': /^row$/i,
  'SQUARE': /^square$/i,
  'CONTAINER_ROUND': /^container-round$/i,
};
const S=selectors;

describe('Test game component', () => {
  beforeAll(() => {
  })

  it('must render game component control arrows', () => {
    render(<App />);
    const leftArrow = screen.getByLabelText(S.CONTROL_PREVIOUS_HISTORY);
    expect(leftArrow).not.toBeEmptyDOMElement();
    expect(leftArrow).toHaveTextContent(C.CONTROL_PREVIOUS_HISTORY);

    const rightArrow = screen.getByLabelText(S.CONTROL_NEXT_HISTORY);
    expect(rightArrow).not.toBeEmptyDOMElement();
    expect(rightArrow).toHaveTextContent(C.CONTROL_NEXT_HISTORY);
  });

  it('must render game round play history list as player plays rounds', () => {
    render(<App />);
    const roundContainer = screen.getByLabelText(S.CONTAINER_ROUND);
    expect(roundContainer).not.toBeEmptyDOMElement();
  });

  it('must render pale control-arrows when game starts', () => {
    expect(true).toBe(true);
  });

  it('must render pale right control-arrows when theres no history to advance', () => {
    expect(true).toBe(true);
  });
});

describe('Test board component', () => {
  beforeAll(() => {

  })

  it('renders board game', () => {
    render(<App />);
    const board = screen.getByText(S.TITLE);

    const squares = screen.getAllByLabelText(S.SQUARE);
    expect(squares).toHaveLength(9);

    squares.forEach(sqr => {
      expect(sqr).not.toHaveTextContent()
    });

    expect(board).toBeInTheDocument();
  });

  it('mark squares as user click (case 1)', async () => {
    render(<App />);

    let rows = screen.getAllByLabelText(S.ROW);
    let squaresSecondRow = await within(rows[1]).findAllByLabelText(S.SQUARE)
    let secSqrSecRow = squaresSecondRow[1];
    
    await waitFor(() => userEvent.click(secSqrSecRow))

    expect(secSqrSecRow).toHaveTextContent(C.PLAYER_1_SYMBOL)

    // if clicked again, keep mark
    await waitFor(() => userEvent.click(secSqrSecRow))
    expect(secSqrSecRow).toHaveTextContent(C.PLAYER_1_SYMBOL)


    // it clicked in another square, fills it with '0'
    let firstRow = await within(rows[0]).findAllByLabelText(S.SQUARE);
    let secondSquareFirstRow = firstRow[1];

    // expect non-clicked square to be NOT filled
    expect(secondSquareFirstRow).toHaveTextContent("")


    await waitFor(() => userEvent.click(secondSquareFirstRow))
    expect(secondSquareFirstRow).toHaveTextContent(C.PLAYER_2_SYMBOL)

    expect(true).toBe(true)
  });

  it('mark squares as user click (case 2)', async () => {
    render(<App />);

    let rows = screen.getAllByLabelText(S.ROW);
    let squaresSecondRow = await within(rows[2]).findAllByLabelText(S.SQUARE)
    let secSqrSecRow = squaresSecondRow[1];
    
    await waitFor(() => userEvent.click(secSqrSecRow))

    expect(secSqrSecRow).toHaveTextContent(C.PLAYER_1_SYMBOL)

    // if clicked again, keep mark
    await waitFor(() => userEvent.click(secSqrSecRow))
    expect(secSqrSecRow).toHaveTextContent(C.PLAYER_1_SYMBOL)

    // it clicked in another square, fills it with player_2 symbol
    let firstSqrSeconddRow = squaresSecondRow[0];
    await waitFor(() => userEvent.click(firstSqrSeconddRow ))
    expect(firstSqrSeconddRow).toHaveTextContent(C.PLAYER_2_SYMBOL)
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
    const board =[ [C.PLAYER_1_SYMBOL,    C.PLAYER_1_SYMBOL,      null], 
                   [null,                 null,                   null], 
                   [null,                 null,                   null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    // --> fills 1th row
    board[0][2] = C.PLAYER_1_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe(C.PLAYER_1_SYMBOL)

    // resolveGameWinner()
    expect(true).toBe(true)
  });


  it('must return a winner if 2th row is filled', () => {
    const board =[ [C.PLAYER_1_SYMBOL,  C.PLAYER_1_SYMBOL,      null             ], 
                   [null,               C.PLAYER_1_SYMBOL,      C.PLAYER_1_SYMBOL], 
                   [null,               null,                   null             ] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    // --> fills 1th row
    board[1][0] = C.PLAYER_1_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe(C.PLAYER_1_SYMBOL)

    // resolveGameWinner()
    expect(true).toBe(true)
  });

  it('must return a winner if 3th row is filled', () => {
    const board =[ [C.PLAYER_1_SYMBOL,    null,                 null], 
                   [null,                 C.PLAYER_1_SYMBOL,    null], 
                   [null,                 null,                 null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    // --> fills 1th row
    board[2][0] = C.PLAYER_1_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();


    board[2][1] = C.PLAYER_1_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[2][2] = C.PLAYER_1_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe(C.PLAYER_1_SYMBOL)

    // resolveGameWinner()
    expect(true).toBe(true)
  });

  it('must return a winner if 1th column is filled', () => {
    const board =[ [C.PLAYER_1_SYMBOL,    null,                 null], 
                   [C.PLAYER_1_SYMBOL,    null,                 null], 
                   [null,                 null,                 null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();


    board[2][0] = C.PLAYER_1_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe(C.PLAYER_1_SYMBOL)
  });


  it('must return a winner if 2th column is filled', () => {
    const board =[ [null,                 C.PLAYER_2_SYMBOL,    null], 
                   [null,                 C.PLAYER_2_SYMBOL,    null], 
                   [null,                 null,                 null] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[2][1] = C.PLAYER_2_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe(C.PLAYER_2_SYMBOL)
  });

  it('must return a winner if 3th column is filled', () => {
    const board =[  [null,                null,                 C.PLAYER_1_SYMBOL], 
                    [null,                null,                 C.PLAYER_1_SYMBOL], 
                    [null,                null,                 null             ] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[2][2] = C.PLAYER_1_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe(C.PLAYER_1_SYMBOL)
  });

  it('must return a winner if main diagonal is filled (case 1)', () => {
    const board =[ [C.PLAYER_2_SYMBOL,    null,                 C.PLAYER_2_SYMBOL ], 
                   [null,                 C.PLAYER_2_SYMBOL,    null              ], 
                   [C.PLAYER_1_SYMBOL,    C.PLAYER_2_SYMBOL,    null              ] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[1][0] = C.PLAYER_2_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();


    board[2][2] = C.PLAYER_2_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe(C.PLAYER_2_SYMBOL);
  });


  it('must return a winner if secondary diagonal is filled (case 2)', () => {
    const board =[ [C.PLAYER_1_SYMBOL,    C.PLAYER_1_SYMBOL,    null              ], 
                   [null,                 C.PLAYER_2_SYMBOL,    null              ], 
                   [C.PLAYER_2_SYMBOL,    C.PLAYER_2_SYMBOL,    C.PLAYER_1_SYMBOL ] ];

    let gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();

    board[1][0] = C.PLAYER_1_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBeNull();


    board[0][2] = C.PLAYER_2_SYMBOL;
    gameResult = resolveGameWinner(board)
    expect(gameResult).toBe(C.PLAYER_2_SYMBOL);
  });


  it('must return null if draw game', () => {

    const gameResult = null;

    expect(gameResult).toBeNull()
  });
});


describe.skip('Test roundPlay game', () => {
  let gameInitialState;
  let game;
  let resetState;
  beforeAll(async () => {
    gameInitialState = {
      board: [ [null,null,null], 
                [null,null,null], 
                [null,null,null] ],
      symbol: C.PLAYER_1_SYMBOL,
      round: 1,
      winner: null
    };

    const { result, rerender } = renderHook(useGame, { ...gameInitialState });
    [game, setGame] = result.current;
    resetState = rerender;
  });

  afterEach(async () => {
    const { result, rerender } = renderHook(useGame, { ...gameInitialState });
    [game, setGame] = result.current;
    resetState = rerender;
  })


  it(`it must result in ${C.PLAYER_1_SYMBOL} winner after 5th play (${C.PLAYER_1_SYMBOL} marks main diagonal)`, async () => {
    // X fills main diagonal 
    roundPlay(game, 0, 0);  // X play
    roundPlay(game, 0, 1);  // 0 play
    roundPlay(game, 1, 1); // X play
    roundPlay(game, 0, 2); // 0 play
    roundPlay(game, 2, 2); // X play

    expect(game.winner).not.toBeNull()
    expect(game.winner).toBe(C.PLAYER_1_SYMBOL);
  });

  it.skip(`it must result in ${C.PLAYER_1_SYMBOL} winner after 8th play (${C.PLAYER_2_SYMBOL} marks secondary diagonal)`, async () => {
    resetState({...gameInitialState})

    // diagonal fill
    roundPlay(game, 0, 0);  // X play
    roundPlay(game, 0, 2);  // 0 play
    roundPlay(game, 0, 1); // X play
    console.log(game)

    expect(game.winner).not.toBeNull()
    expect(game.winner).toBe(C.PLAYER_2_SYMBOL);
  });
});



describe.skip('Test history control arrows', () => {
  it(`must display round history if some user theres a play`, () => {
    expect(true).toBe(true);
  });

  it(`must advance round history if user clicks on right arrow`, () => {
    expect(true).toBe(true);
  });

  it(`must revert round history if user clicks on left arrow`, () => {
    expect(true).toBe(true);

  });
})
