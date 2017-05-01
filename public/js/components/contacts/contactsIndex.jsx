import React from 'react'
import Header from '../header/header.jsx'
import Modal from 'react-modal'

export default class contactsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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

  render() {
    return (
      <div>
        <Header />
        <div>
          <h1>Index</h1>
          <ul>
            {
              this.props.contacts.map((contact, idx) => {
                return (
                  <li className='contact' key={contact._id}>
                    <p>{contact.name}</p>
                    <p>{contact.address}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal isOpen={this.state.modalIsOpen} contentLabel='Example'>
          <button onClick={this.closeModal}>Close</button>
          <form id='contacts-form'>
            Name
            <input type='text'/>
            Address
            <input type='text'/>
          </form>
        </Modal>
      </div>
    )
  }
}
