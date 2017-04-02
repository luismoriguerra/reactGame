import React from 'react';

class Footer extends React.Component {

  remainingCount() {
    if(this.props.gameState !== "recall") { return null; }
    return (
      <div className="remaining-count">
        {this.props.activeCellsCount - this.props.correctGuesses.length}
      </div>
    );
  }

  playAgainButton() {
    if(['won', 'lost'].indexOf(this.props.gameState) >= 0) {
      return (
        <button className="play-again-button" onClick={this.props.playAgain}>
          Play again
        </button>
      )
    }
  }

  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]} ...
        </div>
        <div>
          {this.remainingCount()}
          {this.playAgainButton()}
        </div>
      </div>
    );
  }
}


Footer.defaultProps = {
  hints: {
    ready: "Get Ready",
    memorize: "Memorize",
    recall: 'Recall',
    won: "Well played",
    lost: "game over"
  }
}

export default Footer;
