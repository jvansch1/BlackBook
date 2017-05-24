import React from 'react'
import { hashHistory, Link } from 'react-router'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  login(e) {
    e.preventDefault()
    this.props.login(this.state).then(() => hashHistory.push('/contacts'))
  }

  updateUsername(e) {
    this.setState({ username: e.currentTarget.value }, () => console.log(this.state))
  }

  updatePassword(e) {
    this.setState({ password: e.currentTarget.value }, () => console.log(this.state))
  }

  render() {
    return(
      <div id="auth-wrapper">
        <div id='video-wrapper'>
          <video autoPlay='true' height='100%' loop>
            <source src="https://s3.us-east-2.amazonaws.com/blackbook-dev/699571461.mp4" type="video/mp4"/>
          </video>
        </div>
        <div id='login-form-wrapper'>
          <h1>Login</h1>
          <form onSubmit={this.login.bind(this)}>
            <p>Username</p>
            <input type='text' onChange={this.updateUsername.bind(this)}/>
            <p>Password</p>
            <input type='text' onChange={this.updatePassword.bind(this)}/>
            <input type='submit' value='Login'/>
          </form>
          <p>Not a user? <Link to='/'>Sign Up!</Link></p>
        </div>
      </div>
    )
  }
}
