import React, { Component } from 'react'
import './HowTo.css';
export default class HowTo extends Component{
   render(){
     return (
        <div className="howto-essay">
           <div className="part-essay">
              <div className="detail-title-wrap">
                 <h1 className="detail-title">
                    <span>使用方法</span>
                 </h1>
              </div>
              <div className="detail-content-wrap">
                 <div className="detail-content">
                    <div>
                       <div className="cl-preview-section">
                          <h1>操作流程</h1>
                       </div>
                       <div className="cl-preview-section"><p></p>
                       </div>
                       <div className="cl-preview-section"><p><br /><img src="https://torgor.github.io/styles/images/jmm/jvm-heap-oop-structure.png" alt="jvm-heap-oop-structure.png" data-original="https://torgor.github.io/styles/images/jmm/jvm-heap-oop-structure.png" class="" style={{ cursor: 'pointer', display: 'block' }} /></p>
                       </div>   
                    </div>
                 </div>
              </div>
           </div>
        </div>
     )
   }
}