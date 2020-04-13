import React from 'react';
import ReactDOM from 'react-dom';

import Game from './app';
import Test from './test';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Game />
        <hr />
        <Test />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);