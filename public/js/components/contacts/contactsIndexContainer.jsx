import { connect } from 'react-redux'
import contactsIndex from './contactsIndex.jsx'
import { fetchContacts, createContact } from '../../actions/contactActions.js'

const mapStateToProps = (state) => {
  if (window.store.getState().session.username) {
    let username = window.store.getState().session.username
    return {
      contacts: Object.keys(state.contacts).map(key => state.contacts[key]),
      username: username
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: (username) => dispatch(fetchContacts(username)),
    createContact: (contact) => dispatch(createContact(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsIndex)
