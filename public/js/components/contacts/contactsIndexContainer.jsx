import { connect } from 'react-redux'
import contactsIndex from './contactsIndex.jsx'
import { withRouter } from 'react-router-dom'
import { fetchContacts, createContact } from '../../actions/contactActions.js'

const mapStateToProps = (state) => {
  if (state.session.username) {
    let username = state.session.username
    return {
      contacts: Object.keys(state.contacts).map(key => state.contacts[key]),
      username: username
    }
  }
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: (username) => dispatch(fetchContacts(username)),
    createContact: (contact) => dispatch(createContact(contact))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(contactsIndex))
