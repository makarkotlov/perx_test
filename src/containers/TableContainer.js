import { pick, path, compose } from 'rambda'
import { connect } from 'react-redux'

import TableComponent from '../components/TableComponent'

import { deleteUser, fetchUsers, getTotal } from '../store/users/actions'

const mapStateToProps = compose(
  pick(['users', 'total', 'pageSize', 'loading']),
  path(['users'])
)

const mapDispatchToProps = {
  deleteUser,
  fetchUsers,
  getTotal,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)
