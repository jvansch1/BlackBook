import React from 'react'
import HeaderContainer from '../header/headerContainer.jsx'
import Modal from 'react-modal'
import aws from 'aws-sdk'
import config from '../../../../AwsConfig.js'
aws.config.region = config.region
aws.config.accessKeyId = config.accessKeyId
aws.config.secretAccessKey = config.secretAccessKey

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
      id: null,
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
        id: contact._id,
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
    this.setState({ email: e.currentTarget.value })
  }

  updatePhone(e) {
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

  submitContact(e) {
    if (this.state.imageFile === null) {
      this.props.updateContact({id: this.props.id, name: this.state.name, notes: this.state.notes, phone: this.state.phone, email: this.state.email, address: this.state.address, imageUrl: 'https://s3.us-east-2.amazonaws.com/blackbook-dev/default_user.png', username: this.state.username }).then(() => this.setState({ modalIsOpen: false })).then(() => this.props.fetchContacts(this.props.username))
    }
    else {
      let params = {Key: 'ImageName', Body: this.state.imageFile, ACL: 'public-read-write', Bucket: config.awsbucket}
      e.preventDefault()
      bucket.putObject({
        ACL:'public-read-write',
        Bucket: config.awsbucket,
        Key: this.state.imageFile.name,
        Body: this.state.imageFile
      }, (err, response) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log(response)
        }
      })
      bucket.getSignedUrl('getObject', { Bucket: config.awsbucket, Key: this.state.imageFile.name }, (err, url) => {
        this.setState({ imageUrl: `http://s3.${aws.config.region}.amazonaws.com/${config.awsbucket}/${this.state.imageFile.name}` })
        this.props.updateContact({id: this.props.id, name: this.state.name, notes: this.state.notes, phone: this.state.phone, email: this.state.email, address: this.state.address, imageUrl: `http://s3.${aws.config.region}.amazonaws.com/${config.awsbucket}/${this.state.imageFile.name}`, username: this.props.username }).then(() => this.setState({ modalIsOpen: false })).then(() => this.props.fetchContacts(this.props.username))
      })
    }
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
        <form id='contacts-form' onSubmit={this.submitContact.bind(this)}>
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
