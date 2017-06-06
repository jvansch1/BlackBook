import React from 'react'
import HeaderContainer from '../header/headerContainer.jsx'
import Modal from 'react-modal'
import ContactsIndexItem from './contactsIndexItem.jsx'
import { Link } from 'react-router-dom'
import aws from 'aws-sdk'
import config from '../../../../AwsConfig.js'
import setState from 'react-state-promise'
import PropTypes from 'prop-types'
aws.config.region = config.region
aws.config.accessKeyId = config.accessKeyId
aws.config.secretAccessKey = config.secretAccessKey

const bucket = new aws.S3({signatureVersion: 'v4'});

export default class contactsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      name: '',
      address: '',
      username: props.username,
      email: '',
      phone: '',
      notes: '',
      search: '',
      imageUrl: null,
      imageFile: null,
      mounted: false,
      loading: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.submitContact = this.submitContact.bind(this)
  }

  componentDidMount() {
      this.props.fetchContacts(this.props.username).then(() => this.setState({username: this.props.username})).then(() => this.props.fetchContacts(this.props.username)).then(() => this.setState({mounted: true}))
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  submitContact(e) {
    if (this.state.imageFile === null) {
      this.props.createContact({name: this.state.name, notes: this.state.notes, phone: this.state.phone, email: this.state.email, address: this.state.address, imageUrl: 'https://s3.us-east-2.amazonaws.com/blackbook-dev/default_user.png', username: this.state.username }).then(() => this.setState({ modalIsOpen: false })).then(() => this.props.fetchContacts(this.props.username))
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
            setState(this, { imageUrl: `http://s3.${aws.config.region}.amazonaws.com/${config.awsbucket}/${this.state.imageFile.name}`, loading: true }).then(() => {
              this.props.createContact({name: this.state.name, notes: this.state.notes, phone: this.state.phone, email: this.state.email, address: this.state.address, imageUrl: `http://s3.${aws.config.region}.amazonaws.com/${config.awsbucket}/${this.state.imageFile.name}`, username: this.props.username })
              .then(() => this.setState({ modalIsOpen: false, loading: true})).then(() => this.props.fetchContacts(this.props.username))
            })
          })
        }
      })
    }
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

  updateSearch(e) {
    this.setState({search: e.currentTarget.value})
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

  renderList() {
    if (this.props.contacts.length === 0) {
      return (<p id='no-contacts'>No Contacts</p>)
    } else {
      return this.props.contacts.map((contact, idx) => {
        if ((contact.name.toLowerCase()).includes(this.state.search.toLowerCase())) {
          return (
            <Link to={`contacts/${contact._id}`} key={idx} replace>
              <ContactsIndexItem contact={contact}/>
            </Link>
          )
        }
      })
    }
  }

  renderSpinner() {
    if (this.state.loading) {
      return (
        <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
      )
    }
    return null;
  }

  render() {
    if (!this.props.username) return null;
    if (!this.state.mounted) return null;
    let modalStyles = {overlay: {zIndex: 1000000000}};
    return (
      <div>
        <HeaderContainer />
        <div id='index-container'>
          <div id='transparent'>
          </div>
          <span id='filter-container'>
            <textarea id='filter' onChange={this.updateSearch.bind(this)} placeholder='Filter by Name'></textarea>
            <button id='open-button' onClick={this.openModal}>Open Modal</button>
          </span>
          <ul id='contact-list'>
            {
              this.renderList()
            }
          </ul>
        </div>
        <Modal isOpen={this.state.modalIsOpen} contentLabel='Example' style={modalStyles}>
          <i className="fa fa-times-circle" aria-hidden="true" onClick={this.closeModal}></i>
          <h1 className='form-header'>Add Contact</h1>
          <form id='contacts-form' onSubmit={this.submitContact}>
            <span>
              Name
              <input type='text' onChange={this.updateName.bind(this)}/>
            </span>
            <span>
              Address
              <input type='text' onChange={this.updateAddress.bind(this)}/>
            </span>
            <span>
              Email
              <input type='text' onChange={this.updateEmail.bind(this)}/>
            </span>
            <span>
              Phone
              <input type='text' onChange={this.updatePhone.bind(this)}/>
            </span>
            <span>
              Picture
              <input type='file' onChange={this.addFile.bind(this)}/>
            </span>
            <span>
              Notes
              <textarea onChange={this.updateNotes.bind(this)} maxLength="140"></textarea>
            </span>
            <p>{this.state.notes.length}/140</p>
            <input type='submit' />
          </form>
        </Modal>
      </div>
    )
  }
}
