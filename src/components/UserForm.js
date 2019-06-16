import React from 'react'
import { Form, Button, Input } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import uuid from 'uuid'

const UserForm = ({
    form,
    addNewUser,
    _getSubmitBtnRef,
    _toggleModal,
    _getData,
}) => {
    const handleSubmit = e => {
            e.preventDefault()
            form.validateFields((err, formData) => {
                if (!err) {
                    formData.key = uuid()
                    addNewUser(formData)
                        .then(() => {
                            _toggleModal()
                            _getData()
                            toast.success('New User is Added!')
                        })
                        .catch(err => toast.error(err))
                }
            })
        },
        { getFieldDecorator } = form,
        formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }

    return (
        <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item {...formItemLayout} label="Name">
                {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input your name',
                            type: 'string',
                        },
                    ],
                })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Email">
                {getFieldDecorator('email', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input valid email',
                            type: 'email',
                        },
                    ],
                })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Password">
                {getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                    ],
                })(<Input.Password />)}
            </Form.Item>

            <Button
                htmlType="submit"
                className="hidden"
                ref={ref => _getSubmitBtnRef(ref)}
            />
        </Form>
    )
}

export default Form.create()(UserForm)
