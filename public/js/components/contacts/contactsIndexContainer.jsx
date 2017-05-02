import { connect } from 'react-redux'
import contactsIndex from './contactsIndex.jsx'
import { fetchContacts, createContact } from '../../actions/contactActions.js'

const mapStateToProps = (state) => {
  return {
    contacts: Object.keys(state.contacts).map(key => state.contacts[key]),
    username: state.session.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: () => dispatch(fetchContacts()),
    createContact: (contact) => dispatch(createContact(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsIndex)
