import React from 'react'
import Header from '../header/header.jsx'

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
    return (<p>{contact[0].name}</p>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Show</h1>
        {this.renderContact()}
      </div>
    )
  }
}
