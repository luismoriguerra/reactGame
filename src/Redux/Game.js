import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Cell from './Cell';
import Footer from './Footer';
import Timer from './Timer';

import * as actions  from './actions';
import _ from 'lodash';


class Game extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.setMatrix();
    }

    setMatrix () {
      this.matrix = [];
      let { rows , columns, activeCellsCount } = this.props;

      for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
          row.push(`${r}${c}`)
        }
        this.matrix.push(row);
      }
    }

    getActiveCells () {
      let oneDimensionMatrix = _.flatten(this.matrix);
      return  _.sampleSize(oneDimensionMatrix, this.props.activeCellsCount);
    }

    componentDidMount() {
      setTimeout(() => {
        this.props.actions.changeGameState("memorize");
        this.props.actions.setActiveCells(this.getActiveCells());
        setTimeout(this.startRecallMode.bind(this), 2000)
      }, 2000)
    }

    startRecallMode() {
      this.secondsRemaining = this.props.limitTime;
      this.props.actions.changeGameState("recall");
      this.props.actions.updateTimer(this.secondsRemaining);

      this.playTimerId = setInterval(() => {
        if( --this.secondsRemaining === 0) {
          this.props.actions.changeGameState("lost");
        }
        this.props.actions.updateTimer(this.secondsRemaining);
      }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
      if (['won', 'lost'].indexOf(this.props.gameState) >= 0) {
        clearInterval(this.playTimerId);
      }
    }

    render() {
        return (
            <div className="Game">
                {this.matrix.map((row, index) => (
                  <div className="row" key={index}>
                    {row.map((cellId) => (
                      <Cell key={cellId} cellId={cellId} />
                    ))}
                  </div>
                ))}
                {this.props.gameState}
                {this.props.gameState === 'recall' && <Timer />}
                <Footer />
            </div>
        );
    }
}

function mapStateToProps({ gameState }){
    return {
      gameState
    };
}

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(actions, dispatch)
    };
}

Game.defaultProps = {
  limitTime: 10
}

export default connect (mapStateToProps,mapDispatchToProps)(Game);
