import { connect } from 'react-redux'

import EditUserForm from '../components/EditUserForm'

import { updateUser } from '../store/users/actions'

const mapStateToProps = ({ users: { error } }) => ({
    error,
})

const mapDispatchToProps = {
    updateUser,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUserForm)
