import React, { useState, useEffect } from 'react'
import { Table, Button, Divider, Modal, Popconfirm, Input, Icon } from 'antd'
import UserFormContainer from '../containers/UserFormContainer'
import EditUserFormContainer from '../containers/EditUserFormContainer'
import { toast } from 'react-toastify'

const TableComponent = ({
    users,
    deleteUser,
    fetchUsers,
    getTotal,
    total,
    loading,
}) => {
    const [visible, _setVisible] = useState(false),
        [showEdit, _setShowEdit] = useState(false),
        [submitBtnRef, _setSubmitBtnRef] = useState({}),
        [updateBtnRef, _setUpdateBtnRef] = useState({}),
        [searchInputRef, _setSearchInputRef] = useState({}),
        [record, _setRecord] = useState({}),
        _getColumnSearchProps = dataIndex => ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div className="search-input-container">
                    <Input
                        ref={node => _setSearchInputRef(node)}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() => confirm()}
                        className="search-input"
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon="search"
                        size="small"
                        className="search-input-confirm-btn"
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters()}
                        size="small"
                        className="search-input-reset-btn"
                    >
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: filtered => (
                <Icon
                    type="search"
                    style={{ color: filtered ? '#1890ff' : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => searchInputRef.select())
                }
            },
        }),
        columns = [
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
                        <Button
                            onClick={() => {
                                _setRecord(record)
                                _setShowEdit(true)
                                _toggleModal()
                            }}
                        >
                            Edit
                        </Button>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="Are you sure delete this user?"
                            onConfirm={() => _deleteUser(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger">Del</Button>
                        </Popconfirm>
                    </span>
                ),
            },
        ],
        _toggleModal = () => _setVisible(!visible),
        _getSubmitBtnRef = ref => _setSubmitBtnRef(ref),
        _getUpdateBtnRef = ref => _setUpdateBtnRef(ref),
        _handleSubmit = () => submitBtnRef.buttonNode.click(),
        _handleUpdate = () => updateBtnRef.buttonNode.click(),
        _getData = () => {
            getTotal()
                .then(() => fetchUsers())
                .catch(err => toast.error(err))
        },
        _deleteUser = record => {
            deleteUser(record.objectId)
                .then(() => {
                    toast.success('User was successfully Deleted!')
                    _getData()
                })
                .catch(err => toast.error(err))
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
                pagination={{ total, pageSize: 4 }}
            />

            <Button
                className="flexed-centered"
                onClick={() => {
                    _setShowEdit(false)
                    _toggleModal()
                }}
            >
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
