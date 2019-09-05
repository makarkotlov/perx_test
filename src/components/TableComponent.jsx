// @flow
import React, { useState, useEffect } from 'react'
import { Table, Button, Divider, Modal, Popconfirm, Icon } from 'antd'
import UserFormContainer from '../containers/UserFormContainer'
import EditUserFormContainer from '../containers/EditUserFormContainer'
import Search from './Search'
import Notification from './Notification'

const TableComponent = ({
  users,
  deleteUser,
  fetchUsers,
  getTotal,
  total,
  pageSize,
  loading,
}) => {
  const [visible, _setVisible] = useState(false)
  const [showEdit, _setShowEdit] = useState(false)
  const [submitBtnRef, _setSubmitBtnRef] = useState({})
  const [updateBtnRef, _setUpdateBtnRef] = useState({})
  const [record, _setRecord] = useState({})
  const [pageNumber, _setPageNumber] = useState(1)

  const _handleSearch = (dataIndex, phrase) => {
    const search = {
      name: dataIndex === 'name',
      phrase,
    }
    const pageNum = 1
    fetchUsers(pageNum, search)
      .then(success => {
        if (!success)
          Notification.error('An error occured while fetching the users')
      })
      .catch(err => Notification.error(err))
  }
  const _getData = () => {
    getTotal()
      .then(success => {
        if (!success) {
          Notification.error(
            'An error occured while fetching the users quantity'
          )
          return
        }
        fetchUsers(pageNumber)
      })
      .catch(err => Notification.error(err))
  }
  const _getColumnSearchProps = dataIndex => ({
    filterDropdown: () => (
      <Search
        handleSearch={_handleSearch}
        getData={_getData}
        dataIndex={dataIndex}
      />
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  })
  const _toggleModal = () => _setVisible(!visible)
  const _deleteUser = record => {
    deleteUser(record.objectId)
      .then(success => {
        if (!success) {
          Notification.error('An error occured while deleting the user')
          return
        }
        Notification.success('User is DELETED!')
        _getData()
      })
      .catch(err => Notification.error(err))
  }
  const handleEdit = () => record => {
    _setRecord(record)
    _setShowEdit(true)
    _toggleModal()
  }
  const handleDelete = () => record => _deleteUser(record)
  const handleAdd = () => {
    _setShowEdit(false)
    _toggleModal()
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ..._getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ..._getColumnSearchProps('email'),
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <span>
          <Button onClick={handleEdit(record)}>Edit</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Del</Button>
          </Popconfirm>
        </span>
      ),
    },
  ]
  const _getSubmitBtnRef = ref => _setSubmitBtnRef(ref)
  const _getUpdateBtnRef = ref => _setUpdateBtnRef(ref)
  const _handleSubmit = () => submitBtnRef.buttonNode.click()
  const _handleUpdate = () => updateBtnRef.buttonNode.click()
  const _handleChange = ({ current }) => {
    _setPageNumber(current)
    fetchUsers(current)
  }

  useEffect(() => {
    _getData()
  }, [])

  return (
    <div className="table">
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ total, pageSize }}
        onChange={_handleChange}
      />

      <Button className="flexed-centered" onClick={handleAdd}>
        Add New User
      </Button>

      <Modal
        title={showEdit ? 'Edit User' : 'Add User'}
        visible={visible}
        onCancel={_toggleModal}
        footer={[
          <Button key="back" onClick={_toggleModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={showEdit ? _handleUpdate : _handleSubmit}
          >
            {showEdit ? 'Update' : 'Submit'}
          </Button>,
        ]}
      >
        {showEdit ? (
          <EditUserFormContainer
            _getUpdateBtnRef={_getUpdateBtnRef}
            _toggleModal={_toggleModal}
            _getData={_getData}
            record={record}
          />
        ) : (
          <UserFormContainer
            _getSubmitBtnRef={_getSubmitBtnRef}
            _toggleModal={_toggleModal}
            _getData={_getData}
          />
        )}
      </Modal>
    </div>
  )
}

export default TableComponent
