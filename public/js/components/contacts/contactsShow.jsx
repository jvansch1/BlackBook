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
    // if (this.props.contact.length == 0) return null;
    // console.log(this.props.contact)
    // let contact = []
    // this.props.contact.forEach(contactObject => {
    //   if (contactObject._id === this.props.id) {
    //     contact.push(contactObject)
    //   }
    // })
    console.log(this.props)
    if (!this.props.contact) return null;
    return (
      <div id='contact-list'>
        <div className='contact'>
          <img id='contact-show-image' src={this.props.contact.imageUrl} />
          <div>
            <p>{this.props.contact.name}</p>
            <p>{this.props.contact.address}</p>
            <p>{this.props.contact.address}</p>
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
