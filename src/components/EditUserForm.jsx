import React from 'react'
import { Form, Button, Input } from 'antd'
import Notification from './Notification'

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
    getUpdateBtnRef,
    getData,
    toggleModal,
    record,
  } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, formData) => {
      if (!err) {
        const data = {
          ...record,
          ...formData,
        }
        updateUser(data)
          .then(success => {
            if (!success) {
              Notification.error('User is NOT UPDATED!')
              return
            }
            toggleModal()
            getData()
            Notification.success('User is UPDATED!')
          })
          .catch(err => Notification.error(err))
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
        ref={ref => getUpdateBtnRef(ref)}
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
    getUpdateBtnRef={_getUpdateBtnRef}
    getData={_getData}
    toggleModal={_toggleModal}
  />
)

export default EditUserForm
