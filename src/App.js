import logo from './logo.svg';
import './App.css';

export default function Board () {
  return (
    <div className="board">
      <BoardRow/>
      <BoardRow/>
      <BoardRow/>
    </div>
  )
};

function BoardRow () {
  return (
      <div className="board-row">
        <Square checked="X"/>
        <Square checked="X"/>
        <Square checked="X"/>
      </div>
  )
}

function Square ({ checked }) {
  return <button className="square">{checked}</button>
}