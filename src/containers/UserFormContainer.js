import { connect } from 'react-redux'

import { addNewUser } from '../store/users/actions'

import UserForm from '../components/UserForm'

const mapDispatchToProps = {
    addNewUser,
}

export default connect(
    null,
    mapDispatchToProps
)(UserForm)
