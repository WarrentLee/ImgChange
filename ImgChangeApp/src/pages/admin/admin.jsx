import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../home/Home'
import UserCenter from "../usercenter/UserCenter";
import UploadFace from "../upload/UploadFace";
import UploadStyle from "../upload/UploadStyle";
import AndMore from '../andmore/AndMore';
import HowTo from '../howto/HowTo';
import Header from '../../component/header/Header'
import Footer from '../../component/footer/Footer'
import Login from '../login/Login'
import Try from '../try/Try'

import React, { Component } from 'react'

export default class Admin extends Component{
    render(){
        return (
        <div>
            <Header/>
            <Switch>
                <Redirect from='/' exact to='/home' />
                <Route path='/home' component={Home} />
                <Route path="/howto" component={HowTo} />
                <Route path="/usercenter" component={UserCenter} />
                <Route path="/uploadface" component={UploadFace} />
                <Route path="/uploadstyle" component={UploadStyle} />
                <Route path="/andmore" component={AndMore} />
                <Route path="/login" component={Login} />
                <Route path="/try" component={Try} />
            </Switch>
            <Footer/>
        </div>
        )
    }
}

