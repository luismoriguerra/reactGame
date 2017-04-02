import React, { Component } from 'react';


import Game from './components/Game'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 1,
      columns: 5,
      rows: 5
    };
  }

  createNewGame() {
    this.setState({
      gameId: ++this.state.gameId,
      columns: ++this.state.columns,
      rows: ++this.state.rows,
    })
  }


  render() {
    return (
      <div className="App">
        <Game key={this.state.gameId}
              createNewGame={this.createNewGame.bind(this)}
              rows={this.state.rows}
              columns={this.state.columns}
              activeCellsCount={6} />
      </div>
    );
  }
}

export default App;
