import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';

class Cell extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    handleClick() {
      if (this.props.gameState !== "recall" ||
        this.props.guessState) return false;

      if (this.props.activeCells.find(item => item == this.props.cellId)) {
        this.props.actions.recordCorrectGuess(this.props.cellId);
      } else {
        this.props.actions.recordWrongGuess(this.props.cellId);
      }
    }

    render() {
      let className =` cell ${this.props.guessState} `;
      if (this.props.isCellActive && this.props.showActiveCellsAllowed) {
        className += " active "
      }
        return (
            <div
              className={className}
              onClick={this.handleClick.bind(this)}>
                {this.props.cellId}
            </div>
        );
    }
}

function mapStateToProps({activeCells, gameState, wrongGuesses, correctGuesses}, ownProps){

    const currentCellId = ownProps.cellId;
    let guessState = '';
    if (wrongGuesses.indexOf(currentCellId) >= 0) {
      guessState = "guess-false";
    } else if (correctGuesses.indexOf(currentCellId) >= 0) {
      guessState = "guess-true";
    }

    return {
      activeCells,
      gameState,
      isCellActive: activeCells.find( cellId => cellId == currentCellId),
      showActiveCellsAllowed: ["memorize", 'lost'].indexOf(gameState) >= 0,
      guessState
    };
}

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(actions,dispatch)
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(Cell);
