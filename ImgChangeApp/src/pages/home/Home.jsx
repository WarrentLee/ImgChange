import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import './Home.less';
import first_img_before from '../../assets/images/first_img_before.jpg'
import first_img_after from '../../assets/images/first_img_after.jpg'
import second_img_before from '../../assets/images/second_img_before.jpg'
import second_img_after from '../../assets/images/second_img_after.jpg'
import third_img from '../../assets/images/third_img.jpg'

class Home extends Component {
   render() {
      return (
         <div id="home-page">
            <div className="headline">
               <div className="point">
                  <Link to="uploadface">
                     <img src={second_img_before} alt="风格二" />
                     <div className="index_page__slidImag1">
                        <div className="index_page__slideMask2">
                           <img src={second_img_after} alt="风格二" />
                        </div>
                     </div>
                     <div className="caption">
                        <h2>人脸漫画化</h2>
                     </div>
                  </Link>
               </div>
               <div className="point">
                  <Link to="uploadstyle">
                     <div id="section-point1">
                        <img src={first_img_before} alt="风格一" />
                        <div className="index_page__slidImag1">
                           <div className="index_page__slideMask2">
                              <img src={first_img_after} alt="风格一" />
                           </div>
                        </div>
                     </div>
                     <div className="caption">
                        <h2>风格转移</h2>
                     </div>
                  </Link>
               </div>
               <div className="point">
                  <Link to="uploadstyle">
                     <img src={third_img} alt="上传图片" />
                     <div className="caption">
                        <h2>上传图片</h2>
                     </div>
                  </Link>
               </div>
               <div className="point" id="usercenter">
                  <Link to="/usercenter">
                     <img src={first_img_before} alt="用户中心" />
                     <div className="index_page__slidImag1">
                        <div className="index_page__slideMask2">
                           <img src={second_img_after} alt="用户中心" />
                        </div>
                     </div>
                     <div className="caption">
                        <h2>用户中心</h2>
                     </div>
                  </Link>
               </div>
            </div>
         </div>
         // <div id="home-page">
         //    <Section srcBefore={first_img_before} srcAfter={first_img_after}/>
         // </div>
      )
   }
}

export default connect(
   state => ({ user: state.user }),
)(Home)