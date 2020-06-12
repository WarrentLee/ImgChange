import React, { Component } from 'react'
import './Header.css';
import { Link, withRouter, Redirect} from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import {logout} from '../../redux/actions'
import {connect} from 'react-redux'
import { Modal } from 'antd';
class Header extends Component {4

   // constructor(){
   //    super();
   //    this.state = {
   //       visible:false
   //    }
   // }

   showUser = () => {
      console.log(this.props.user);
      if (JSON.stringify(this.props.user) !== '{}') {
         return (
            <>
               <Link to="/usercenter"><span>个人中心</span></Link>
            <span onClick={this.logoutConfirm}>退出</span>
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

   logoutConfirm = ()=>{
      Modal.confirm({
         content:'确定要退出吗?',
         onOk:()=>{
            this.props.logout();
            this.props.history.push({
               pathname:'/home'
            })
         }
      });
   }
   render() {
      return (
         <header className="header" style={{ width: '100%' }}>
            <h1 className="header-logo">
               <Link to='/' id="link">
                  <img src={logo} alt="logo" />
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
                  <li>
                     {this.showUser()}
                  </li> 
               </ul>
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