import React from 'react'
import { Form, Button, Input } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CustomForm = Form.create({
    mapPropsToFields(props) {
        const {
            record: { name, email },
        } = props
        return {
            name: Form.createFormField({
                ...name,
                value: name,
            }),
            email: Form.createFormField({
                ...email,
                value: email,
            }),
        }
    },
})(props => {
    const {
            form,
            updateUser,
            _getUpdateBtnRef,
            _getData,
            _toggleModal,
            record,
        } = props,
        { getFieldDecorator } = form,
        formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        },
        handleSubmit = e => {
            e.preventDefault()
            form.validateFields((err, formData) => {
                if (!err) {
                    const data = {
                        ...record,
                        ...formData,
                    }
                    updateUser(data)
                        .then(() => {
                            _toggleModal()
                            _getData()
                            toast.success('User is Updated!')
                        })
                        .catch(err => toast.error(err))
                }
            })
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
                ref={ref => _getUpdateBtnRef(ref)}
            />
        </Form>
    )
})

const EditUserForm = ({
    record,
    updateUser,
    _getUpdateBtnRef,
    _getData,
    _toggleModal,
}) => (
    <CustomForm
        record={record}
        updateUser={updateUser}
        _getUpdateBtnRef={_getUpdateBtnRef}
        _getData={_getData}
        _toggleModal={_toggleModal}
    />
)

export default EditUserForm
