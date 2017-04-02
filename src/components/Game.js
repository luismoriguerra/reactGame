import React from 'react';
import Row from './Row';
import Cell from './Cell';
import Footer from './Footer';
import _ from 'lodash';
import './styles.css'
import Score from './Score'

class Game extends React.Component {

  constructor(props) {
    super(props);

    let { rows, columns } = this.props;
    this.matrix = [];

    for( let r = 0; r < rows; r++) {
      let row = [];
      for (let column = 0; column < columns; column++) {
        row.push(`${r}${column}`);
      }
      this.matrix.push(row);
    }

    let flatMatrix = _.flatten(this.matrix);
    this.activeCells = _.sampleSize(flatMatrix,
      this.props.activeCellsCount);

    this.state = {
      gameState: "ready",
      wrongGuesses: [],
      correctGuesses: [],
      remainingTime: this.props.timeoutSeconds
    }
  }

  componentDidMount() {
    this.memorizeTimerId = setTimeout(() => {
      this.setState({gameState: "memorize"}, () => {
        this.recallTimerId = setTimeout(
          this.startRecallMode.bind(this)
        , 2000);
      })
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.memorizeTimerId);
    clearTimeout(this.recallTimerId);
    this.finishGame();
  }

  startRecallMode() {
    this.setState({gameState: "recall"}, ()=> {
      this.secondsRemaining = this.props.timeoutSeconds;
      this.playTimerId = setInterval(()=> {
        if( --this.secondsRemaining === 0) {
          this.setState({gameState: this.finishGame('lost')})
        }
        this.setState({remainingTime: this.secondsRemaining});
      }, 1000)
    })
  }

  finishGame(gameState) {
    clearInterval(this.playTimerId);
    return gameState;
  }

  recordGuess( {cellId, userGuessIsCorrect} ) {
    let { wrongGuesses, correctGuesses, gameState } = this.state;

    if(userGuessIsCorrect) {
      correctGuesses.push(cellId);
      if (correctGuesses.length === this.props.activeCellsCount) {
        gameState = this.finishGame("won");
      }
    } else {
      wrongGuesses.push(cellId);
      if (wrongGuesses.length > this.props.allowWrongAttempts) {
        gameState = this.finishGame("lost");
      }
    }

    this.setState({correctGuesses, wrongGuesses, gameState});

  }

  render() {

    let showActiveCells = ["memorize", 'lost'].indexOf(this.state.gameState) >= 0;

    return (
      <div className="grid">
        {this.matrix.map((row, index) => (
          <Row key={index}>
            {row.map(cellId => (
              <Cell
                key={cellId}
                id={cellId}
                showActiveCells={showActiveCells}
                recordGuess={this.recordGuess.bind(this)}
                activeCells={this.activeCells}
                {...this.state}
                />
            ))}
          </Row>
        ))}

        <Footer {...this.state}
                playAgain={this.props.createNewGame}
                activeCellsCount={this.props.activeCellsCount} />

        {this.state.gameState === 'won' && <Score {...this.state} />}
        <div>
          Remaining time : {this.state.remainingTime}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  rows: React.PropTypes.number,
  columns: React.PropTypes.number,
  activeCellsCount: React.PropTypes.number
}

Game.defaultProps = {
  allowWrongAttempts: 2,
  timeoutSeconds: 10
}

export default Game
