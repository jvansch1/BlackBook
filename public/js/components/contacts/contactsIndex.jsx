import React from 'react'
import Header from '../header/header.jsx'

export default class contactsIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchContacts()
  }

  render() {
    console.log(this.props.contacts)
    return (
      <div>
        <Header />
        <div>
          <h1>Index</h1>
          <ul>
            {
              this.props.contacts.map(contact => {
                return (
                  <li>
                    <p>{contact.name}</p>
                    <p>{contact.address}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
