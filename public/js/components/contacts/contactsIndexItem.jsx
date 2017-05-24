import React from 'react'

export default class ContactsIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className='contact' key={this.props.contact._id}>
        <img className='contact-image' src={this.props.contact.imageUrl} />
        <div>
          <p>Name: {this.props.contact.name}</p>
          <p>Address: {this.props.contact.address}</p>
          <p>Email: {this.props.contact.email}</p>
          <p>Phone Number: {this.props.contact.phone}</p>
        </div>
      </li>
    )
  }
}
