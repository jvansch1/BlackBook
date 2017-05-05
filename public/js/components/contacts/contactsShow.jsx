import React from 'react'
import HeaderContainer from '../header/headerContainer.jsx'

export default class contactsShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchContact(this.props.id)
  }

  renderContact() {
    if (this.props.contact.length == 0) return null;
    let contact = []
    this.props.contact.forEach(contactObject => {
      if (contactObject._id === this.props.id) {
        contact.push(contactObject)
      }
    })
    return (
      <div id='contact-list'>
        <div className='contact'>
          <img id='contact-show-image' src={contact[0].imageUrl} />
          <div>
            <p>{contact[0].name}</p>
            <p>{contact[0].address}</p>
          </div>
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
