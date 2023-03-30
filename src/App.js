import logo from './logo.svg';
import './App.css';

export default function Board () {
  const boardRows=[0,1,2].map(x => <BoardRow key={x}/>)

  return (
    <div className="board">
      {boardRows}
    </div>
  )
};

function BoardRow () {
  const rowSquares = [0,1,2].map((x) => <Square key={x} checked="X" />)

  return (
      <div className="board-row">
        {rowSquares}
      </div>
  )
}

function Square ({ checked }) {
  return <button className="square">{checked}</button>
}