import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Section extends Component{

    render(){
        return (
            <div className="point">
                   <Link to="upload">
                      <div id="section-point1">
                         <img src={this.props.srcBefore} alt="风格一" />
                         <div className="index_page__slidImag1">
                            <div className="index_page__slideMask2">
                                <img src={this.props.srcAfter} alt="风格一" />
                            </div>
                         </div>
                      </div>
                      <div className="caption">
                         <h2>title</h2>
                      </div>
                   </Link>
            </div>
        )
    }
}

export default Section;