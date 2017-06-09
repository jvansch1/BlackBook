import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router-dom'
import LoginContainer from '../auth/loginContainer.jsx'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.logout({username: 'guest', password: 'password'}).then(() => this.props.clearErrors())
      .then(() => this.props.logout({username: 'guest', password: 'password'}));
  }

  loginGuest(e) {
    e.preventDefault()
    this.props.login({username: 'guest', password: 'password'}).then(() => this.props.history.replace('/contacts'));
  }

  CheckIfLoggedIn() {
    if (this.props.currentUser.username) {
      this.props.history.replace('/contacts')
    }
  }

  render() {
    if (this.props.username) return null;
    return (
      <div id='landing'>
        <div id='video-wrapper'>
          <video autoPlay='true' height='100%' loop>
            <source src="https://s3.us-east-2.amazonaws.com/blackbook-dev/699571461.mp4" type="video/mp4"/>
          </video>
        </div>
        <div id='landing-div'>
          <img id='landing-img' src='/static/img/PetitFormalLogo.png' />
          <span>
            <Link to='/signup'><div id='singup-button'>SIGNUP</div></Link>
            <div id='guest-button' onClick={this.loginGuest.bind(this)}>GUEST</div>
          </span>
          <p id='link-to-login'>Already a User? <Link to='/login'><u>Log In!</u></Link></p>
        </div>
      </div>
    )
  }
}
