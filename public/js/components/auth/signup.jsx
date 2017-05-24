import React from 'react'
import { hashHistory, Link } from 'react-router'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  createUser(e) {
    e.preventDefault()
    this.props.createUser(this.state).then(user => this.props.login(user.user)).then(() => hashHistory.push('/contacts'))
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
          <h1>Signup</h1>
          <form onSubmit={this.createUser.bind(this)}>
            <p>Username</p>
            <input type='text' onChange={this.updateUsername.bind(this)} />
            <p>Password</p>
            <input type='password' onChange={this.updatePassword.bind(this)} />
            <input type='submit' value='Sign up'/>
          </form>
          <p>Already a user?<Link to='/login'>Login!</Link></p>
        </div>
      </div>
    )
  }
}
