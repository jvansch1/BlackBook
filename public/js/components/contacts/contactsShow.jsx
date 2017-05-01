import React from 'react'

export default class contactsShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchContact(this.props.id)
  }

  renderContact() {
    if (this.props.contact.length == 0) return null;
    return (<p>{this.props.contact[0].name}</p>
    )
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Show</h1>
        {this.renderContact()}
      </div>
    )
  }
}
