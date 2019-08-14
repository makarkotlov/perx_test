import { pick } from 'ramda'
import { connect } from 'react-redux'

import EditUserForm from '../components/EditUserForm'

import { updateUser } from '../store/users/actions'

const mapStateToProps = pick(['users'])

const mapDispatchToProps = {
  updateUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserForm)
