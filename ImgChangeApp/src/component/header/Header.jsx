import React, { Component } from 'react'
import './Header copy.less';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { logout } from '../../redux/actions'
import { connect } from 'react-redux'
import { Modal, Menu } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;

class Header extends Component {
   4

   // constructor(){
   //    super();
   //    this.state = {
   //       visible:false
   //    }
   // }

   showUser1 = () => {
      if (JSON.stringify(this.props.user) !== '{}') {
         return (
            <>
               <span onClick={this.logoutConfirm}>退出</span>
            </>
         )
      } else {
         return <Link to='/login' id="login" >登录</Link>
      }
   }
   showUser2 = () => {
      if (JSON.stringify(this.props.user) !== '{}') {
         return (
            <>
               <li>
                  <Link to='/usercenter' id="usercenter" >个人中心</Link>
               </li>
               <li>
                  <span onClick={this.logoutConfirm}>退出</span>
               </li>
            </>
         )
      } else {
         return <Link to='/login' id="login" >登录</Link>
      }
   }

   // showModal = () => {
   //    this.setState({
   //       visible: true,
   //    });
   // };

   // handleOk = e => {
   //    console.log(e);
   //    this.setState({
   //       visible: false,
   //    });
   // };

   // handleCancel = e => {
   //    console.log(e);
   //    this.setState({
   //       visible: false,
   //    });
   // };

   logoutConfirm = () => {
      Modal.confirm({
         content: '确定要退出吗?',
         onOk: () => {
            this.props.logout();
            this.props.history.push({
               pathname: '/home'
            })
         }
      });
   }
   render() {
      return (
         <header className="header" style={{ width: '100%' }}>
            <h1 className="header-logo">
               <img src={logo} alt="logo" />
               <Link to='/' id="logo">
                  &nbsp;Decima
            </Link>
            </h1>
            <div className="header-right">
               <ul className="header-right-link">
                  <li>
                     <Link to='/uploadface'>
                        人脸漫画
                     </Link>
                  </li>
                  <li>
                     <Link to='/uploadstyle'>
                        风格转移
                     </Link>
                  </li>
                  <li>
                     <Link to='/home'>
                        主页
                     </Link>
                  </li>
                  {/* <li>
                     <Link to='/try'>
                        案例试用
                     </Link>
                  </li> */}
                  <li>
                     <Link to='/howto'>
                        使用方法
                     </Link>
                  </li>
                  <li>
                     <Link to='/andmore'>
                        了解更多
                     </Link>
                  </li>
                     {this.showUser2()}
               </ul>
               <Menu id="menu">
                  <SubMenu icon={<UnorderedListOutlined />} mode="horizontal">
                     <Menu.ItemGroup title="应用">
                        <Menu.Item key="uploadface">
                           <Link to='/uploadface'>
                              人脸漫画
                           </Link>
                        </Menu.Item>
                        <Menu.Item key="uploadstyle">
                           <Link to='/uploadstyle'>
                              风格转移
                           </Link>
                        </Menu.Item>
                        <Menu.Item key="home">
                           <Link to='/home'>
                              主页
                           </Link>
                        </Menu.Item>
                        <Menu.Item key="howto">
                           <Link to='/howto'>
                              使用方法
                           </Link>
                        </Menu.Item>
                        <  Menu.Item key="andmore">
                           <Link to='/andmore'>
                              了解更多
                           </Link>
                        </Menu.Item>
                     </Menu.ItemGroup>
                     <Menu.ItemGroup title="个人">
                        <Menu.Item key="usercenter"><Link to="/usercenter">个人中心</Link></Menu.Item>
                        <Menu.Item key="handle">{this.showUser1()}</Menu.Item>
                     </Menu.ItemGroup>
                  </SubMenu>
               </Menu>
            </div>
         </header>
      )
   }
}
export default connect(
   state => ({ user: state.user }),
   { logout }
)(withRouter(Header))
// export default Header;