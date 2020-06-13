import React, { Component } from 'react';
import MasonryLayout from 'react-masonry-component';
import Settings from './Settings'
import axios from 'axios'
import cs from 'classnames'
import {
    Result,
    Modal
} from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';


class UserCenterImg extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            hasMore: false, // 是否开启下拉加载
            data: [], // 接受我每次的数据
            count: 0,
            chosen: props.chosen,
            storage: [],
            isLoading: false,
            page: 1,
            hasStore: false,
            previewImage: null,
            previewVisible: false
        }
        this.loadMoreData(this.state.page)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chosen !== this.propschosen) {
            this.setState({
                storage: [],
                chosen: nextProps.chosen
            }, () => {
                if (this.state.chosen !== 'settings') {
                    this.loadMoreData()
                }
            });
        }
    }


    componentDidMount() {
        window.addEventListener('scroll', () => {
            if (document.getElementsByClassName('box')[0]!={} && document.documentElement.scrollTop > document.getElementsByClassName('box')[0].getBoundingClientRect().height + 130 - document.body.clientHeight) {
                if (!this.state.isLoading && this.state.hasMore) {
                    this.setState({
                        isLoading: true,
                        page: this.state.page + 1,
                    })
                    this.loadMoreData(this.state.page)
                } else if (!this.state.hasMore) {
                    this.setState({
                        page: 1
                    })
                }
            } else {
                this.setState({
                    page: 1,
                })
            }
        })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', () => {
            if (document.getElementsByClassName('box')[0]!={} && document.documentElement.scrollTop > document.getElementsByClassName('box')[0].getBoundingClientRect().height + 130 - document.body.clientHeight) {
                if (!this.state.isLoading && this.state.hasMore) {
                    this.setState({
                        isLoading: true,
                        page: this.state.page + 1,
                    })
                    this.loadMoreData(this.state.page)
                } else if (!this.state.hasMore) {
                    this.setState({
                        page: 1
                    })
                }else{
                }
            } else {
                this.setState({
                    page: 1
                })
            }
        })
    }
    componentDidUpdate() {
        window.addEventListener('scroll', () => {
            if (document.getElementsByClassName('box')[0]!= {}  && document.documentElement.scrollTop > document.getElementsByClassName('box')[0].getBoundingClientRect().height + 130 - document.body.clientHeight) {
                if (!this.state.isLoading && this.state.hasMore) {
                    this.setState({
                        isLoading: true,
                        page: this.state.page + 1,
                    })
                    this.loadMoreData(this.state.page)
                } else if (!this.state.hasMore) {
                    this.setState({
                        page: 1
                    })
                }
            }else{
                this.setState({
                    page:1
                })
            }
        })
    }

    // 加载更多数据
    loadMoreData = async (page = 1) => {
        let imgsArr = [];
        // page 当前滚动到了第几页
        // page 是当前请求第几页数据
        // per_page 每页我需要返回的数据条数
        var response = new Promise((resolve, reject) => {
            let promise = axios.get('/api/image/', { params: { page, per_page: 15, category: this.state.chosen === 'all' ? null : this.state.chosen } })
            promise.then(res => {
                resolve(res);
            }).catch(err => reject(err))
        }
        )

        var res = await response;

        var reqImgById = (id, config) => axios.get(
            `/api/image/${id}`, config
        ).then((res) => {
            return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        })

        var reqImg = (array) => {
            let config = {
                headers: {
                    'Content-Type': 'multipart/form - data',
                    // 'responseType': 'stream'
                    // responseType: 'image'
                },
                responseType: 'arraybuffer'
            }
            array.map(async (id) => {
                //    console.log(id);
                const result = await reqImgById(id, config)
                imgsArr = [...imgsArr, result];
                this.setState({
                    hasMore: res.data.page * res.data.per_page <= res.data.total,
                    storage: [...this.state.storage, result],
                    count: res.data.images.length,
                    // data: imgsArr,
                })
                this.setState({
                    data: this.state.storage,
                })
            }
            )
        }

        reqImg(res.data.images)
        this.setState({
            isLoading: false
        });
    }

    toggleForm = () => {
        this.props.switchForm("register")
    }

    handleShow = (e) => {
        let src = e.target.src;
        this.setState({
            previewImage: src,
            previewVisible:true
        })
    }

    handleCancel = ()=>{
        this.setState({
            previewVisible: false
        })
    }

    render() {
        const {  data, chosen, previewVisible, previewImage } = this.state
        if (chosen !== 'settings') {
            if (data && data.length !== 0) {
                return (
                    <div className="box" >
                        <Modal
                            visible={previewVisible}
                            title={'预览'}
                            footer={null}
                            onCancel={this.handleCancel}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                        <MasonryLayout
                            itemselector={'.d'} // 要布局的网格元素
                            columnwidth={200}  // 获取节点 可以自动计算每列的宽度
                            fitwidth="true" // 设置网格容器宽度等于网格宽度
                            gutter={10}
                            percentposition="true"          // 使用columnWidth对应元素的百分比尺寸
                        >
                            {/* <div className="pages-hoc"> */}
                            {data.map((value, key) => {
                                return (
                                    <div
                                        key={key}
                                        className={cs('d', { d1: key % 2 === 0, d2: key % 2 !== 0 })}
                                        onClick={this.handleShow}
                                    >
                                        <img src={value} key={key} alt="img" />
                                    </div>
                                )
                            })}
                            {/* </div> */}
                        </MasonryLayout>
                    </div>
                )
            } else {
                return <Link to="/uploadface">
                    <Result
                        icon={<FileImageOutlined />}
                        title="图片墙"
                    />
                </Link>
            }
        } else {
            return <Settings />
        }
    }
}

export default UserCenterImg;