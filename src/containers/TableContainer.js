import { connect } from 'react-redux'

import TableComponent from '../components/TableComponent'

import { deleteUser, fetchUsers, getTotal } from '../store/users/actions'

const mapStateToProps = ({ users: { users, total, loading, pageSize } }) => ({
    users,
    total,
    pageSize,
    loading,
})

const mapDispatchToProps = {
    deleteUser,
    fetchUsers,
    getTotal,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent)
