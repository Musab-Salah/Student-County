import React,{ Component } from "react";
import { connect } from 'react-redux'


class test extends Component{
    constructor(props){
        super(props);
        this.state={
            test : "in test",
        }
    }

    render(){
        return <h1>{this.props.test}</h1>
    }
}

function msp(state){
    return{
      test: state.test
    }
    }
    

export default connect (msp)(test);
