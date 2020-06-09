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


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

function downloadImg() {
    var img = document.getElementById('returnImg');
    var url = img.src;
    console.log(img);
    var a = document.createElement('a');
    var event = new MouseEvent('click');
    a.download = '图片下载';
    a.href = url;
    a.dispatchEvent(event);
}

class UploadApp extends Component {


    uploadImage = async ({ file, fileList }) => {
        var imgSrc;
        if(fileList.length === 0){
            imgSrc= await getBase64(file.originFileObj);
        }else{
            imgSrc = await getBase64(fileList[0].originFileObj);
        }
        this.setState({
            imageSrc: imgSrc,
            fileList: fileList,
        })
        this.returnImage(this.props.type === 'type1' ? reqImg1 : reqImg2)
    }

    returnImage = async (func) => {
        console.log('a');
        const result = await func(this.state.imageSrc);
        const url = result.url;
        // console.log(url);
        this.setState({
            returnImg: url
        })
        // console.log(this.state);
    }

    downloadImage = () => {
        downloadImg();
    }

    state = {
        imageSrc: uploadPicture,
        fileList: [],
        returnImg: uploadPictureAfter
    }

    uploadProps = (type) => {
        return {
            name: 'files' + type,
            action: () => { return type === 'type1' ? 'https://www.mocky.io/v2/5cc8019d300000980a055e76' :'https://www.mocky.io/v2/5cc8019d300000980a055e76'},
            headers: {
                authorization: 'authorization-text',
            },
            accept: "image/jpeg,image/jpg,image/png,image/svg",
            fileList:[]
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
                            <button className="button button-download" onClick={this.downloadImage.bind(this)}>
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