import { connect } from 'react-redux'
import contactsShow from './contactsShow.jsx'
import { fetchContact } from '../../actions/contactActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    contact: Object.keys(state.contacts).map(key => state.contacts[key]),
    id: ownProps.routeParams.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContact: (id) => dispatch(fetchContact(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsShow)
