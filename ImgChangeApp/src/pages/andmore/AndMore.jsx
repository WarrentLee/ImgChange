import React, { Component } from 'react'
import './AndMore.css';
export default class AndMore extends Component{
   render(){
     return (
        <div className="andmore-essay">
           <div className="part-essay">
              <div className="detail-title-wrap">
                 <h1 className="detail-title">
                    <span>了解更多</span>
                 </h1>
              </div>
              <div className="detail-content-wrap">
                 <div className="detail-content">
                    <div>
                       <div className="cl-preview-section">
                          <h1>制作团队</h1>
                       </div>
                       <div className="cl-preview-section"><p></p>
                       </div>
                       <div className="cl-preview-section"><p><br /><img src="https://torgor.github.io/styles/images/jmm/jvm-heap-oop-structure.png" alt="jvm-heap-oop-structure.png" data-original="https://torgor.github.io/styles/images/jmm/jvm-heap-oop-structure.png" className="" style={{ cursor: 'pointer', display: 'block' }} /></p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     )
}
}