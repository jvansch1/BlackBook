import React from 'react'
import HeaderContainer from '../header/headerContainer.jsx'

export default class contactsShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOneContact(this.props.id)
  }

  renderContact() {
    if (!this.props.contact) return null;
    return (
      <div id='contact-list'>
        <div className='contact'>
          <img id='contact-show-image' src={this.props.contact.imageUrl} />
          <div>
            <p>Name: {this.props.contact.name}</p>
            <p>Address: {this.props.contact.address}</p>
            <p>Email: {this.props.contact.email}</p>
            <p>Phone: {this.props.contact.phone}</p>
            <p>Notes: {this.props.contact.notes}</p>
          </div>
          <i className="fa fa-pencil-square" aria-hidden="true"></i>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <h1>Show</h1>
        {this.renderContact()}
      </div>
    )
  }
}
