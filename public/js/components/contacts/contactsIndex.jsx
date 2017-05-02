import React from 'react'
import Header from '../header/header.jsx'
import Modal from 'react-modal'
import { Link } from 'react-router'

export default class contactsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      name: '',
      address: '',
      username: props.username
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.submitContact = this.submitContact.bind(this)
  }

  componentDidMount() {
    this.props.fetchContacts()
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  submitContact(e) {
    e.preventDefault()
    this.props.createContact(this.state).then(() => this.setState({ modalIsOpen: false })).then(this.props.fetchContacts())
  }

  updateName(e) {
    this.setState({ name: e.currentTarget.value })
  }

  updateAddress(e) {
    this.setState({ address: e.currentTarget.value })
  }

  renderList() {
    return this.props.contacts.map((contact, idx) => {
      if (this.props.username === contact.username) {
        return (
          <Link to={`/contacts/${contact._id}`}>
            <li className='contact' key={contact._id}>
              <p>Name: {contact.name}</p>
              <p>Address: {contact.address}</p>
            </li>
          </Link>
        )
      }
      })
    }

  render() {
    if (!this.props.username) return null;
    return (
      <div>
        <Header />
        <div>
          <h1>Index</h1>
          <ul id='contact-list'>
            {
              this.renderList()
            }
          </ul>
        </div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal isOpen={this.state.modalIsOpen} contentLabel='Example'>
          <button onClick={this.closeModal}>Close</button>
          <form id='contacts-form' onSubmit={this.submitContact}>
            Name
            <input type='text' onChange={this.updateName.bind(this)}/>
            Address
            <input type='text' onChange={this.updateAddress.bind(this)}/>
            <input type='submit'/>
          </form>
        </Modal>
      </div>
    )
  }
}
