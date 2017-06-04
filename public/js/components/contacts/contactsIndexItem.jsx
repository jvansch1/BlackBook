import React from 'react'

export default class ContactsIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className='contact' key={this.props.contact._id}>
        <img className='contact-image' src={this.props.contact.imageUrl} />
        <div className='contact-content'>
          <p className='contact-field'><u>Name:</u> <b>{this.props.contact.name}</b></p>
          <p className='contact-field'><u>Address:</u> <b>{this.props.contact.address}</b></p>
          <p className='contact-field'><u>Email:</u> <b>{this.props.contact.email}</b></p>
          <p className='contact-field'><u>Phone Number:</u> <b>{this.props.contact.phone}</b></p>
          <p id='notes-container'><u>Notes:</u>&nbsp;<span id='index-notes'><b>{this.props.contact.notes}</b></span></p>
        </div>
      </li>
    )
  }
}
