import React, {PropTypes} from 'react';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.record = '';
  }

  render() {
    if(['won'].indexOf(this.props.gameState) >=0) {

      switch (this.props.wrongGuesses.length) {
      case 0:
        this.record = 3;
        break;
      case 1:
          this.record = 2;
          break;
      default:
        this.record = 1;
      }

      if(this.props.remainingTime >=5) {
        this.record = this.record * 2;
      }
    }

    return (
      <div>
        Your record is: {this.record}
      </div>);
  }
}
