import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';

class Timer extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="class-name">
                Time: {this.props.timer}
            </div>
        );
    }
}

function mapStateToProps({timer}){
    return {
      timer
    };
}

function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(actions, dispatch)
    };
}

export default connect (mapStateToProps,mapDispatchToProps)(Timer);
