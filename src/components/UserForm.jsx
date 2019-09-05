import React from 'react'
import { Form, Button, Input } from 'antd'
import cuid from 'cuid'
import Notification from './Notification'

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
        formData.key = cuid()
        addNewUser(formData)
          .then(success => {
            if (!success) {
              Notification.error('The user is NOT CREATED!')
              return
            }
            _toggleModal()
            _getData()
            Notification.success('The user is CREATED!')
          })
          .catch(err => Notification.error(err))
      }
    })
  }
  const getSubmitBtnRef = () => ref => _getSubmitBtnRef(ref)
  const { getFieldDecorator } = form
  const formItemLayout = {
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

      <Button htmlType="submit" className="hidden" ref={getSubmitBtnRef} />
    </Form>
  )
}

export default Form.create()(UserForm)
