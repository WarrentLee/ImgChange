import React, { Component } from 'react'
import './UserCenter.css';
import UserCenterImg from './UserCenterImg'


class UserCenterLogined extends Component {
 
    render() {
        return (
            <div className="usercenter-page">
                <div className="usercenter-header">
                    <div className="usercenter-title-wrap">
                        <h1 className="usercenter-title">
                            <span>用户中心</span>
                        </h1>
                    </div>
                </div>
                <div className="usercenter-history">
                    <UserCenterImg/>
                </div>
            </div>
        )
    }
}


export default UserCenterLogined;