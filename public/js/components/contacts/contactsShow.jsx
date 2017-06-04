import React from 'react'
import HeaderContainer from '../header/headerContainer.jsx'
import Modal from 'react-modal'
import { hashHistory } from 'react-router';
import aws from 'aws-sdk'
import config from '../../../../AwsConfig.js'
import setState from 'react-state-promise'
aws.config.region = config.region
aws.config.accessKeyId = config.accessKeyId
aws.config.secretAccessKey = config.secretAccessKey
const bucket = new aws.S3({signatureVersion: 'v4'});

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
      notes: '',
      id: null,
      imageUrl: props.imageUrl,
      imageFile: null,
      mounted: false,
      loading: false
    }
  }

  componentDidMount() {
    this.props.fetchOneContact(this.props.id).then(contact => {
      console.log(contact)
      this.setState({
        modalIsOpen: false,
        name: contact.contact.name,
        address: contact.contact.address,
        username: contact.contact.username,
        email: contact.contact.email,
        phone: contact.contact.phone,
        notes: contact.contact.notes,
        imageUrl: contact.contact.imageUrl,
        id: contact.contact._id,
        imageFile: null,
        mounted: false
      })
      console.log(this.state)
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

  deleteContact() {
    this.props.deleteContact(this.props.id).then(() => hashHistory.push('/contacts'))
  }

  handleError() {
    this.setState({imageUrl: `http://s3.${aws.config.region}.amazonaws.com/${config.awsbucket}/${this.state.imageFile.name}`})
  }

  renderContact() {
    if (!this.props.contact) return null;
    return (
      <div id='contact-list'>
          <div className='contact'>
            <img id='contact-show-image' src={this.props.contact.imageUrl} onError={this.handleError.bind(this)}/>
            <div id='show-content'>
              <p><u>Name:</u> <b>{this.props.contact.name}</b></p>
              <p><u>Address:</u> <b>{this.props.contact.address}</b></p>
              <p><u>Email:</u> <b>{this.props.contact.email}</b></p>
              <p><u>Phone:</u> <b>{this.props.contact.phone}</b></p>
              <p id='notes-container'><u>Notes:</u>&nbsp;<div id='show-notes'><b>{this.props.contact.notes}</b></div></p>
            </div>
            <div id='edit-button-wrapper'>
              <span><i onClick={this.openModal.bind(this)} className="fa fa-pencil-square" aria-hidden="true"></i><p>Edit</p></span>
              <span><i onClick={this.deleteContact.bind(this)} className="fa fa-trash" aria-hidden="true"></i><p>Delete</p></span>
            </div>
          </div>
      </div>
    )
  }

  submitContact(e) {
    if (this.state.imageUrl.length > 0 && this.state.imageFile === null) {
      this.props.updateContact({id: this.props.id, name: this.state.name, notes: this.state.notes, phone: this.state.phone, email: this.state.email, address: this.state.address, imageUrl: this.state.imageUrl, username: this.state.username }).then(() => this.setState({ modalIsOpen: false })).then(() => this.props.fetchContacts(this.props.username))
    }
     else if (this.state.imageFile === null) {
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
          bucket.getSignedUrl('getObject', { Bucket: config.awsbucket, Key: this.state.imageFile.name }, (err, url) => {
            setState(this, { imageUrl: `http://s3.${aws.config.region}.amazonaws.com/${config.awsbucket}/${this.state.imageFile.name}` }).then(() => {
              this.props.updateContact({id: this.props.id, name: this.state.name, notes: this.state.notes, phone: this.state.phone, email: this.state.email, address: this.state.address, imageUrl: `http://s3.${aws.config.region}.amazonaws.com/${config.awsbucket}/${this.state.imageFile.name}`, username: this.props.username })
              .then(() => this.setState({ modalIsOpen: false })).then(() => this.props.fetchContacts(this.props.username))
            })
          })
        }
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
    let modalStyles = {overlay: {zIndex: 1000000000}};
    return (
      <Modal isOpen={this.state.modalIsOpen} contentLabel='Example' style={modalStyles}>
        <i className="fa fa-times-circle" aria-hidden="true" onClick={this.closeModal.bind(this)}></i>
        <h1 className='form-header'>Edit Contact</h1>
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
          <span>
            Picture
            <input type='file' onChange={this.addFile.bind(this)}/>
          </span>
          <span>
            Notes
            <textarea onChange={this.updateNotes.bind(this)} maxLength="140" value={this.state.notes}></textarea>
          </span>
          <p>{this.state.notes.length}/140</p>
          <input type='submit' />
        </form>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        {this.renderContact()}
        {this.Modal()}
      </div>
    )
  }
}
