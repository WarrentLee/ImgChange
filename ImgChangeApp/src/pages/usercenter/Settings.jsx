import React, { Component } from 'react';
import {
    Form,
    Input,
    notification 
} from 'antd'
import { changePassword } from '../../api/index'

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
};

class Settings extends Component {

    onFinish = async (values) => {
        const { old_password, new_password } = values;
        var res = await changePassword(old_password, new_password);
        console.log(res);
        if(res.status === 200){
            this.openNotification('bottomRight')
        }
    };

    openNotification = (placement) => {
        notification.open({
            message: '修改密码成功！',
            // description:
            //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            placement
        });
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

    componentDidMount(){
        if(document.body.clientWidth<576){

        }
    }

    render() {
        return <div className="settings">
            <h2>修改密码</h2>
            <div className="form-wrap">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    className="form-table"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="旧密码"
                        name="old_password"
                        rules={[
                            {
                                required: true,
                                message: '请输入旧密码',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="new_password"
                        rules={[
                            {
                                required: true,
                                message: '请输入新密码',
                                validator: this.validator
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <button type="submit">
                            提交
                    </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    }
}

export default Settings;

// import { Form, Input, Button, Checkbox } from 'antd';

// const layout = {
//     labelCol: {
//         span: 8,
//     },
//     wrapperCol: {
//         span: 16,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 16,
//     },
// };

// const Demo = () => {

//     return (

//     );
// };

// ReactDOM.render(<Demo />, mountNode);