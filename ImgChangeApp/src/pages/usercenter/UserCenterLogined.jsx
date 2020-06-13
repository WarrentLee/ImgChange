import React, { Component } from 'react'
import './UserCenter.css';
import UserCenterImg from './UserCenterImg'
import {Menu} from 'antd'

const {SubMenu}  = Menu;

class UserCenterLogined extends Component {

    constructor(props){
        super(props);
        this.state={
            chosen:'all'
        }
    }

    handleClick = (e)=>{
        console.log(e.key);
        this.setState({
            chosen:e.key
        })
    }

    render() {
        return (
            <div className="usercenter-page">
                <div className="usercenter-header">
                    <Menu onClick={this.handleClick}  mode="horizontal">
                        <SubMenu title="图片墙">
                            <Menu.Item key="all" >
                                所有图片
                            </Menu.Item>
                            <Menu.Item key="face">
                                人脸漫画化
                            </Menu.Item>
                            <Menu.Item key="style">
                                风格转移
                            </Menu.Item>
                            <Menu.Item key="origin" >
                                原始图片
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="settings">
                            账号设置
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="usercenter-history">
                    <UserCenterImg chosen={this.state.chosen}/>
                </div>
            </div>
        )
    }
}


export default UserCenterLogined;