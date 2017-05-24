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
          <h1 className='auth-title'>Signup</h1>
          <form onSubmit={this.createUser.bind(this)}>
            <div className='input-container'>
              <p>Username</p>
              <input type='text' onChange={this.updateUsername.bind(this)} />
            </div>
            <div className='input-container'>
              <p>Password</p>
              <input type='password' onChange={this.updatePassword.bind(this)} />
            </div>
            <div className='auth-button' onClick={this.createUser.bind(this)}>Signup</div>
          </form>
          <p>Already a user?<Link to='/login'>Login!</Link></p>
        </div>
      </div>
    )
  }
}
