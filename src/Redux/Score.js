import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Score extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="class-name">
                Score: {this.props.score}
            </div>
        );
    }
}

function mapStateToProps({ wrongGuesses }){
    let score = 0;
    switch (wrongGuesses.length) {
    case 0:
      score = 3
      break;
      case 1:
        score = 2
        break;
    default:
      score = 1
    }
    return {
      score
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({},dispatch);
}

export default connect (mapStateToProps,mapDispatchToProps)(Score);
