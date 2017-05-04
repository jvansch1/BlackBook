import React from 'react'
import HeaderContainer from '../header/headerContainer.jsx'
import Modal from 'react-modal'
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
    debugger
    let params = {Key: 'ImageName', Body: this.state.imageFile, ACL: 'public-read-write', Bucket: config.awsbucket}
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('address', this.state.address)
    formData.append('image', this.state.imageFile)
    debugger
    bucket.putObject({
      ACL:'public-read-write',
      Bucket: config.awsbucket,
      Key: this.state.imageFile.name,
      Body: this.state.imageFile
    }, (err, response) => {
      if (err) {
        console.log('Error')
        console.log(err)
      }
      else {
        console.log('Response')
        console.log(response)
      }
    })
    this.props.createContact(formData).then(() => this.setState({ modalIsOpen: false })).then(this.props.fetchContacts())
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
