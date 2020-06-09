import React,{Component} from 'react'
import './Upload.css';
import uploadPictureAfter from'../../assets/images/upload-picture-after.png'
import uploadPicture from '../../assets/images/upload-picture.png'
import { UploadOutlined } from '@ant-design/icons';
import {Upload} from 'antd'
import { reqImg1, reqImg2} from '../../api/index'


function getBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
   })
}

function downloadImg(){
   var img = document.getElementById('returnImg');
   var url = img.src;
   console.log(img);
   var a = document.createElement('a');
   var event = new MouseEvent('click');
   a.download = '图片下载';
   a.href = url;
   a.dispatchEvent(event);
}

export default class UploadPage extends Component{

   uploadImage = async ({ file, fileList}) => {
      console.log(file)
      var imgSrc = await getBase64(file.originFileObj);
      this.setState({
         imageSrc: imgSrc,
         fileList: fileList,
      })
      this.returnImage(reqImg1);
   }

   returnImage =async(func)=>{
      const result = await func();
      const url = result.url;
      // console.log(url);
      this.setState({
         returnImg:url
      })
      // console.log(this.state);
   } 

   downloadImage = ()=>{
      downloadImg();
   }

   state = {
      imageSrc: uploadPicture,
      fileList:[],
      returnImg: uploadPictureAfter,
   }

   uploadProps1 = {
      name:'type1',
      action:'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers:{
         authorization: 'authorization-text',
      },
      accept: "image/jpeg,image/jpg,image/png,image/svg",
      fileList:[],
   }
   uploadProps2 = {
      name: 'type2',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
         authorization: 'authorization-text',
      },
      accept: "image/jpeg,image/jpg,image/png,image/svg",
      fileList: [],
   }

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

      const {fileList} = this.state;

       return (
          <div className="upload">
             <div id="app">
                <div className="app-root-container">
                   <div className="upload-section-container">
                      <div className="upload-img">
                         {/* {console.log(this.state.imageSrc)} */}
                         <img src={this.state.imageSrc} alt="img" />
                      </div>
                      <div className="upload-img-footer">
                         <Upload {...this.uploadProps1} onChange={this.uploadImage.bind(this)}>
                            <button className="button">
                               <UploadOutlined/>人像
                              </button>
                         </Upload>
                         <Upload {...this.uploadProps2} onChange={this.uploadImage.bind(this,'b')}>
                            <button className="button">
                               <UploadOutlined />风景
                            </button>
                         </Upload>
                      </div>
                   </div>
                   <div className="upload-section-container">
                      <div className="upload-img"> 
                         <img src={this.state.returnImg} alt="img" id="returnImg"/>
                      </div>
                      <div className="upload-img-footer">
                         <button className="button button-download" onClick={this.downloadImage.bind(this)}>
                            下载
                        </button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       )
    }
}
