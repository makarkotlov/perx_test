import { connect } from 'react-redux'

import TableComponent from '../components/TableComponent'

import { deleteUser, fetchUsers, getTotal } from '../store/users/actions'

const mapStateToProps = ({ users }) => ({
    users: users.users,
    total: users.total,
    loading: users.loading,
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
