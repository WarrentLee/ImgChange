import React, { Component } from 'react';
import RegisterFrom from './RegisterFrom';
import LoginFrom from './LoginFrom';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class Login extends Component {
    constructor(){
        super();
        this.state={
            fromType:"login"
        }
    }
    switchForm = (value)=>{
        this.setState({
            fromType: value
        })
    }

    render(){

        const user = this.props.user;
        if (JSON.stringify(user) !== '{}') {
            return <Redirect to='/usercenter' />
        }
        return <div>
            {
                this.state.fromType === 'login'
                ? <LoginFrom switchForm={this.switchForm}/>
                : <RegisterFrom switchForm={this.switchForm}/>
            }
        </div>
    }
}


export default connect(
    state => ({ user: state.user }),
)(Login)