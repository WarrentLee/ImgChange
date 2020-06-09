import React, { Component } from 'react'
import './UserCenter.css';
import { reqUser } from '../../api';
import { connect } from 'react-redux';
class UserCenter extends Component{
   getUsers = async (user)=>{
      const result = await reqUser(user);
      if (result.status === 0) {
         const { users, roles } = result.data
         this.initRoleNames(roles)
         this.setState({
            users,
            roles
         })
      }
   }

   render(){
     return (
        <div className="usercenter-page">
           <div className="usercenter-header">
              <div className="usercenter-title-wrap">
                 <h1 className="usercenter-title">
                    <span>用户中心</span>
                 </h1>
              </div>
           </div>
        </div>
     )
   }
}


export default connect(
   state => ({ user: state.user }),
)(UserCenter)