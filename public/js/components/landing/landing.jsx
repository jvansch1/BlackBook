import React from 'react'
import { Link, hashHistory } from 'react-router'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
  }

  loginGuest(e) {
    e.preventDefault()
    this.props.login({username: 'guest', password: 'password'}).then(() => hashHistory.push('/contacts'))
  }

  render() {
    console.log(this.props)
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
            <Link to='signup'><div><u>SIGNUP</u></div></Link>
            <div id='guest-button' onClick={this.loginGuest.bind(this)}>GUEST</div>
          </span>
          <p id='link-to-login'>Already a User? <Link to='/login'><u>Log In!</u></Link></p>
        </div>
      </div>
    )
  }
}
