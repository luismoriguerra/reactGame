import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import Score from './Score';


class Footer extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.gameState === 'recall') {
        if (this.props.count === 0) {
          this.props.actions.changeGameState('won')
        } else if (this.props.wrongGuessesCount === this.props.limitWrongGuesses) {
          this.props.actions.changeGameState('lost')
        }
      }
    }
    playAgain() {
      this.props.actions.resetGame();

    }

    render() {
        return (
            <div className="Footer">
                {this.props.showCount && (
                  <div>
                    Faltan: {this.props.count}
                  </div>
                )}
                {this.props.finishedGame && (
                  <div>
                    {this.props.gameState === 'won' && <Score />}
                    <button onClick={this.playAgain.bind(this)}>Play again</button>
                  </div>


                )}
            </div>
        );
    }
}

function mapStateToProps({gameState, activeCells, correctGuesses, wrongGuesses}){
    return {
      gameState,
      showCount: gameState === 'recall',
      count: activeCells.length - correctGuesses.length,
      wrongGuessesCount : wrongGuesses.length,
      finishedGame: ['won', 'lost'].indexOf(gameState) >= 0
    };
}

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(actions,dispatch)
    }
}

Footer.defaultProps = {
  limitWrongGuesses: 5
}


export default connect (mapStateToProps,mapDispatchToProps)(Footer);
