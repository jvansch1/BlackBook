import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  logoutUser(e) {
    e.preventDefault()
    this.props.logout({username: 'guest', password: 'password'}).then(() => this.props.history.replace('/'))
  }

  renderLink() {
    if (this.props.history.location.pathname !== "/contacts") {
      return (
        <Link to='/contacts'>
          <img src='/static/img/PetitFormalLogo.png' />
        </Link>
      )
    } else {
      return (
        <img src='/static/img/PetitFormalLogo.png' />
      )
    }

  }

  render() {
    return (
      <div id='header'>
        {this.renderLink()}
        <button onClick={this.logoutUser.bind(this)}>Logout</button>
      </div>
    )
  }
}
