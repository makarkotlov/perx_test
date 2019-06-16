import { connect } from 'react-redux'

import EditUserForm from '../components/EditUserForm'

import { updateUser } from '../store/users/actions'

const mapDispatchToProps = {
    updateUser,
}

export default connect(
    null,
    mapDispatchToProps
)(EditUserForm)
