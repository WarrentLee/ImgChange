import React,{Component} from 'react'
import './Upload.css';
// import uploadPictureAfter from'../../assets/images/upload-picture-after.png'
// import uploadPicture from '../../assets/images/upload-picture.png'
// import { UploadOutlined } from '@ant-design/icons';
// import {Upload} from 'antd'
// import {reqImg1} from '../../api/index'
import UploadApp from './UploadApp'


export default class UploadPage extends Component{



   // uploadImage = async ({file,fileList}) =>{
   //    console.log('file'+file);
   //    console.log('file.originFileObj'+file.originFileObj)
   //    var imgSrc = await getBase64(file.originFileObj);
   //    console.log('imgSrc' + imgSrc)
   //    this.setState({
   //       imageSrc: imgSrc,
   //       fileList:fileList
   //    })
   // }

   render(){

      var data = this.props.location.state;
       return (
          <div className="upload">
             <div id="app">
                <div className="app-root-container">
                   <UploadApp type='type1' from={data}/>
                   <UploadApp type='type2' from={data}/>
                </div>
             </div>
          </div>
       )
    }
}