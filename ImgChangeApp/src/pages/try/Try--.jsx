import React, { Component } from 'react';
import { Card } from 'antd';
import first_type_image from '../../assets/images/try_first_type.png'
import second_type_image from '../../assets/images/try_second_type.png'
import './Try.css'
import { Link } from 'react-router-dom';

var path1 = {
    pathname: '/upload',
    state: 'type1',
}
var path2 = {
    pathname: '/upload',
    state: 'type2',
}

class Try extends Component{
    onTry = function () {
        if(arguments[0].currentTarget.id === "first-type"){

        }else{
        }
    }
    render(){
        return (
        <div className="try-page">
            <div id="app">
                <div className="try-app-container">
                        <div className="try-section-container" id="first-type"  >
                        <Card
                            hoverable
                            style={{ width: "400px"}}
                                cover={<Link to={path1}><img src={first_type_image} alt="第一种风格" style={{ height: "500px", overflow: 'hidden' }} /></Link>}
                        />
                        </div>
                        <div className="try-section-container"  id="second-type">
                        <Card
                            hoverable
                            style={{ width: "400px", }}
                                cover={<Link to={path2}><img src={second_type_image} alt="第二种风格" style={{ height: "500px", overflow: 'hidden' }} /></Link>}
                        />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Try;