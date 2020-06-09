import React, { Component } from 'react'
import './Header.css';
import { Link,withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import {logout} from '../../redux/actions'
import {connect} from 'react-redux'
import { Modal } from 'antd';

class Header extends Component {

   showUser = () => {
      if (this.props.user.username!==undefined) {
         return <Link to='/usercenter' id="header-userorlogin">
                  {this.props.user.username},
                  <span onClick={this.logout}>退出</span>
                </Link>
      } else {
         return <Link to='/login' id="login" >登录</Link>
      }
   }

   logout = ()=>{
      Modal.confirm({
         content:'确定要退出吗?',
         onOk:()=>{
            this.props.logout()
         }
      })
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
                     <Link to='/upload'>
                        上传
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