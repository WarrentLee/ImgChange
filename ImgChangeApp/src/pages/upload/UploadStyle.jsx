import React, { Component } from 'react';
import uploadPictureAfter from '../../assets/images/upload-picture-after.png'
import uploadPicture from '../../assets/images/upload-picture.png'
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { reqStyleImg, resetStyleImg } from '../../redux/actions'
import { upOriginImg } from '../../api/index' 
import './Upload.css'
import { notification, Spin } from 'antd'


class UploadStyle extends Component {

    downloadImg = () => {
        var img = document.getElementById('returnImg');
        var url = img.src;
        console.log(img);
        var a = document.createElement('a');
        var event = new MouseEvent('click');
        a.download = '图片下载';
        a.href = url;
        a.dispatchEvent(event);
    }

    //getBase64
    getImgSrc = (file) => {
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // reader.onerror = error => reject(error);
                this.setState({
                    showBtn: 'block',
                    file: file,
                    imageSrc: e.target.result,
                })
            };
        }
        return
    }


    // getImgReturn = ()=>{
    //     console.log(this.props.img)
    //     if (this.props.img && this.props.img.length!==0){
    //     this.setState({
    //         returnImg:this.props.img
    //     })
    //     }
    // // }else{
    //         this.setState({
    //             returnImg:uploadPictureAfter
    //         })
    //     }
    // }

    state = {
        file: '',
        imageSrc: uploadPicture,
        returnImg: uploadPictureAfter,
        showBtn: 'none'
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            showBtn: 'none'
        })
        notification.open({
            key: 'loading',
            message: `加载中，请等待`,
            placement: 'bottomRight',
            icon: <Spin />,
            duration: 0,
        });
        var file = this.state.file
        var fd = new FormData();
        fd.append('image', file, file.name, { name: 'image' });
        let config = {
            headers: {
                'Content-Type': 'multipart/form - data',
                // 'responseType': 'stream'
                // responseType: 'image'
            },
            responseType: 'arraybuffer'
        }
        if (JSON.stringify(this.props.user) !== '{}') {
            upOriginImg(fd, config)
        }
        this.props.reqStyleImg(fd, config);
    }

    componentWillMount() {
        this.props.resetStyleImg();
    }

    componentWillReceiveProps(nextProps, preProps) {
        if (nextProps.img!==preProps.img) {
            notification.destroy();
        }
    }

    render() {

        return (
            <div className="upload">
                <div className="app-root-container">
                    <div className="upload-section-container">
                        <form onSubmit={this.handleSubmit.bind(this)}
                            name="fileinfo">
                            {/*accept限定图片上传格式，指定id，方便formData上传时获取file的数据*/}
                            <label for="imgUrl">
                                <input id="imgUrl" name="from1" type="file" accept="image/jpeg,image/x-png" alt="img"
                                    ref="files" onChange={(e) => {
                                        this.getImgSrc(e.target.files[0])
                                    }} style={{ display: 'none' }} />
                                <div className="upload-img">
                                    {/* {console.log(this.state.imageSrc)} */}
                                    <img src={this.state.imageSrc} alt="img"  />
                                    {/* <canvas id='canvas' style={{ width: '354px' }} /> */}
                                    <div className="upload-img-footer">
                                        <button className="button" style={{ display: this.state.showBtn }}>
                                            <UploadOutlined />提交
                                    </button>
                                    </div>
                                </div>
                            </label>
                        </form >
                        <div className="upload-section-container">
                            <div className="upload-img">
                                <img src={this.props.img !== '' ? this.props.img : this.state.returnImg} alt="img" id="returnImg" />
                                {/* <img src={this.state.returnImg} alt="img" id="returnImg" style={{ width: '354px' }} /> */}
                                <div className="upload-img-footer">
                                    <button className="button button-download" onClick={this.downloadImg}>
                                        下载
                            </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        var url = state.styleImg;
        console.log(state);
        return { img: url,user:state.user }
    },
    { reqStyleImg, resetStyleImg }
)(UploadStyle)