import { connect } from 'react-redux'
import contactsIndex from './contactsIndex.jsx'
import { fetchContacts } from '../../actions/contactActions.js'

const mapStateToProps = (state) => {
  return {
    contacts: Object.keys(state.contacts).map(key => state.contacts[key])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: () => dispatch(fetchContacts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsIndex)
