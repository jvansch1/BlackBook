import React from 'react'
import HeaderContainer from '../header/headerContainer.jsx'
import Modal from 'react-modal'

export default class contactsShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      name: props.name,
      address: props.address,
      username: props.username,
      email: props.email,
      phone: props.phone,
      notes: props.notes,
      imageUrl: props.imageUrl,
      imageFile: null,
      mounted: false
    }
  }

  componentDidMount() {
    this.props.fetchOneContact(this.props.id).then(contact => {
      this.setState({
        modalIsOpen: false,
        name: contact.contact.name,
        address: contact.contact.address,
        username: contact.contact.username,
        email: contact.contact.email,
        phone: contact.contact.phone,
        notes: contact.contact.notes,
        imageUrl: contact.contact.imageUrl,
        imageFile: null,
        mounted: false
      })
      return null;
    })
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  updateName(e) {
    this.setState({ name: e.currentTarget.value })
  }

  updateAddress(e) {
    this.setState({ address: e.currentTarget.value })
  }

  updateEmail(e) {
    console.log(this.state)
    this.setState({ email: e.currentTarget.value })
  }

  updatePhone(e) {
    console.log(e.currentTarget.value)
    this.setState({ phone: e.currentTarget.value })
  }

  updateNotes(e) {
    this.setState({notes: e.currentTarget.value})
  }

  renderContact() {
    if (!this.props.contact) return null;
    return (
      <div id='contact-list'>
        <div className='contact'>
          <img id='contact-show-image' src={this.props.contact.imageUrl} />
          <div id='show-content'>
            <p>Name: {this.props.contact.name}</p>
            <p>Address: {this.props.contact.address}</p>
            <p>Email: {this.props.contact.email}</p>
            <p>Phone: {this.props.contact.phone}</p>
            <p>Notes: {this.props.contact.notes}</p>
          </div>
          <div id='edit-button-wrapper'>
            <i onClick={this.openModal.bind(this)} className="fa fa-pencil-square" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }

  addFile(e) {
    const file = e.currentTarget.files[0]
    const fileReader = new FileReader();
    fileReader.onloadend = function() {
      this.setState({imageFile: file, imageUrl: fileReader.result })
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  Modal() {
    console.log(this.state)
    return (
      <Modal isOpen={this.state.modalIsOpen} contentLabel='Example'>
        <button onClick={this.closeModal.bind(this)}>Close</button>
        <form id='contacts-form' onSubmit={this.submitContact}>
          <span>
            Name
            <input type='text' onChange={this.updateName.bind(this)} value={this.state.name}/>
          </span>
          <span>
            Address
            <input type='text' onChange={this.updateAddress.bind(this)} value={this.state.address} />
          </span>
          <span>
            Email
            <input type='text' onChange={this.updateEmail.bind(this)} value={this.state.email}/>
          </span>
          <span>
            Phone
            <input type='text' onChange={this.updatePhone.bind(this)} value={this.state.phone} />
          </span>
          Picture
          <input type='file' onChange={this.addFile.bind(this)}/>
          <textarea onChange={this.updateNotes.bind(this)} maxLength="140" value={this.state.notes}></textarea>
          <input type='submit' />
        </form>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <h1>Show</h1>
        {this.renderContact()}
        {this.Modal()}
      </div>
    )
  }
}
