import React from 'react'
import HeaderContainer from '../header/headerContainer.jsx'
import Modal from 'react-modal'
import ContactsIndexItem from './contactsIndexItem.jsx'
import { Link } from 'react-router'
import aws from 'aws-sdk'
import config from '../../../../AwsConfig.js'
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
      imageUrl: null,
      imageFile: null
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.submitContact = this.submitContact.bind(this)
  }

  componentDidMount() {
    this.props.fetchContacts(this.props.username)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  submitContact(e) {
    if (this.state.imageFile === null) {
      this.props.createContact({name: this.state.name, address: this.state.address, imageUrl: 'https://s3.us-east-2.amazonaws.com/blackbook-dev/default_user.png', username: this.state.username }).then(() => this.setState({ modalIsOpen: false })).then(this.props.fetchContacts())
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
        this.setState({ imageUrl: url })
        this.props.createContact({name: this.state.name, address: this.state.address, imageUrl: url, username: this.state.username }).then(() => this.setState({ modalIsOpen: false })).then(this.props.fetchContacts())
      })
    }
  }

  updateName(e) {
    this.setState({ name: e.currentTarget.value })
  }

  updateAddress(e) {
    this.setState({ address: e.currentTarget.value })
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
    return this.props.contacts.map((contact, idx) => {
      // if (this.props.username === contact.username) {
        return (
          <Link to={`/contacts/${contact._id}`}>
            <ContactsIndexItem contact={contact}/>
          </Link>
        )
      // }
      })
    }

  render() {
    if (!this.props.username) return null;
    return (
      <div>
        <HeaderContainer />
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
            <input type='file' onChange={this.addFile.bind(this)}/>
            <input type='submit' />
          </form>
        </Modal>
      </div>
    )
  }
}
