import React, { Component } from 'react';
import uploadPictureAfter from '../../assets/images/upload-picture-after.png'
import uploadPicture from '../../assets/images/upload-picture.png'
import first_type_image from '../../assets/images/try_first_type.png'
import second_type_image from '../../assets/images/try_second_type.png'
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd'
import { reqImg1, reqImg2 } from '../../api/index'
import { connect } from 'react-redux';
import { setChooseType } from '../../redux/actions'


class UploadApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            imageSrc: uploadPicture,
            file:null,
            fileList: [],
            returnImg: uploadPictureAfter
        }
    }

    downloadImg = ()=> {
        var img = document.getElementById('returnImg');
        var url = img.src;
        console.log(img);
        var a = document.createElement('a');
        var event = new MouseEvent('click');
        a.download = '图片下载';
        a.href = url;
        a.dispatchEvent(event);
    }


    getBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {  
        // reader.onerror = error => reject(error);
        this.setState({
            imageSrc: e.target.result ,
        })
        };
    }


    uploadImage = async ({ file, fileList }) => {
        if(fileList.length === 0){
            this.getBase64(file.originFileObj) ;
        }else{
            this.getBase64(fileList[0].originFileObj);
        }
        this.setState({
            file,
            fileList: fileList,
        })
    }

    // returnImage = async (func) => {
    //     // console.log('a');
    //     const result = await func(this.state.file);
    //     // const url = result.url;
    //     // // console.log(url);
    //     // this.setState({
    //     //     returnImg: url
    //     // })
    //     // // console.log(this.state);
    // }

    uploadProps = (type) => {

        const BASE = '';
        return {
            method:'POST',
            action: type === 'type1' ? BASE + '/api/image/' : BASE + '/api/change/face',
            headers: {
            //     authorization: 'authorization-text',
                // enctype: 'multipart/form-data',
                'Content-Type':'multipart/form-data',
                'accept':'application / json',
            //     'Content-Type': ['image/jpeg', 'image/png']
            //     // 'Content-Type': 'image/png', 
            },
            listType: 'picture',
            // accept: "image/jpg,image/png",
            fileList: [],
            // withCredentials: true
        }
    }


    getApp = (type) => {
        let props = this.uploadProps(type);
        if (type === 'type1') {
            return <Upload {...props} onChange={this.uploadImage.bind(this)}>
                <button className="button">
                    <UploadOutlined />人像
               </button>
            </Upload>
        } else if (type === 'type2') {
            return <Upload {...props} onChange={this.uploadImage.bind(this)}>
                <button className="button">
                    <UploadOutlined />风景
                </button>
            </Upload>
        }
    }



    render() {

        let { type, chooseType } = this.props;
        let {fileList} = this.state;


        return (
            <div className="upload-section-container">
                <div className="upload-img">
                    {/* {console.log(this.state.imageSrc)} */}
                    <img src={this.state.imageSrc} alt="img" style={{ width: '354px' }} />
                    <div className="upload-img-footer">
                        {this.getApp(type)}
                    </div>
                </div>
                <div className="upload-section-container">
                    <div className="upload-img">
                        <img src={this.state.returnImg} alt="img" id="returnImg" style={{ width: '354px' }} />
                        <div className="upload-img-footer">
                            <button className="button button-download" onClick={this.downloadImage}>
                                下载
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ chooseType: state.chooseType }),
    { setChooseType }
)(UploadApp)