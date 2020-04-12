import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
  render() {
    return (
      <div>
        <div className="board">
          {
            Array(9).fill(null).map((item, index) => (
              <button
                className="square"
                onClick={() => this.props.onClick(index)}
                key={index}
              >
                {this.props.data[index]}
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squareData: Array(9).fill(null),
        lastIndex: -1
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentState = history[history.length - 1];

    const squareData = currentState.squareData.slice();
    if (calculateWinner(squareData) || squareData[i]) {
      return
    }
    console.log(`click index: ${i}`);
    squareData[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squareData,
        lastIndex: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const { history } = this.state;
    const currentState = history[this.state.stepNumber];
    const winner = calculateWinner(currentState.squareData);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}, location: ${(step.lastIndex % 3) + 1} -  ${Math.floor(step.lastIndex / 3) + 1}` : 'Go to game start';
      return (
        <li className={(this.state.stepNumber === move) ? 'active' : undefined} key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = `Winner is: ${winner}`;
    } else if (this.state.stepNumber === 9) {
      status = 'It is draw!';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board data={currentState.squareData} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}