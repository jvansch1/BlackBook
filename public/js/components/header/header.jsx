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

  render() {
    return (
      <div id='header'>
        <Link to='/contacts'>
          <img src='/static/img/PetitFormalLogo.png' />
        </Link>
        <button onClick={this.logoutUser.bind(this)}>Logout</button>
      </div>
    )
  }
}
