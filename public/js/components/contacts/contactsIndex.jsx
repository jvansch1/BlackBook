import React from 'react'

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
        <h1>Index</h1>
        <ul>
          {
            this.props.contacts.map(contact => {
              return (<li>{contact.name}</li>)
            })
          }
        </ul>
      </div>
    )
  }
}
