import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { actionTest } from './actions'; // function no keys
import Game from './Game';


class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Game
          key={this.props.gameNumber}
          columns={5}
          rows={5}
          activeCellsCount={6} />
      </div>);
  }
}

function mapStateToProps({gameNumber}) {
  return {
    gameNumber
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTest: (text) => dispatch(actionTest(text))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);
