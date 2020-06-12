import React, { Component } from 'react'
import {
    Form,
    Input,
    Button,
} from 'antd'
// import { Form, Input, Button, Checkbox } from 'antd';
import './Login.css';
import { register } from '../../redux/actions'
import { connect } from 'react-redux'


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
}
class RegisterFrom extends Component {

    onFinish = async (values) => {
        const { username, password } = values;
        this.props.register(username, password);
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    validator = (rule, value, callback) => {
        const length = value && value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if (!value) {
            return Promise.reject('必须输入密码');
        } else if (length < 4) {
            return Promise.reject('密码必须大于4位')
        } else if (length > 12) {
            return Promise.reject('密码必须小于12位')
        } else if (!pwdReg.test(value)) {
            return Promise.reject('密码必须是英文、数字或下划线组成')
        } else {
            return Promise.resolve()
        }
    }

    toggleForm = ()=>{
        this.props.switchForm("login")
    }

    render() {

        return (
            <div className="login">
                <section className="login-content">
                    <h2>用户注册</h2>
                    <div className="form-table">
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish.bind(this)}
                            onFinishFailed={this.onFinishFailed.bind(this)}
                        >
                            <Form.Item
                                // label="用户名"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: '必须输入用户名'
                                    },
                                    { min: 4, message: '用户名必须大于4位' },
                                    { max: 12, message: '用户名必须小于12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成' }
                                ]}

                            >
                                <Input placeholder='请输入用户名' style={{ width: '100%' }}/>
                            </Form.Item>

                            <Form.Item
                                // label="密码"
                                name="password"
                                rules={
                                    [
                                        { validator: this.validator }
                                    ]
                                }
                            >
                                <Input.Password placeholder='请输入密码' style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >注册</Button>
                                <span onClick={this.toggleForm} className="toggle">前往登录</span>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { register }
)(RegisterFrom)