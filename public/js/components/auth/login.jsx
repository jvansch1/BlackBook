import React from 'react'
import { hashHistory } from 'react-router'

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
    console.log(this.props.login)
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
      <div>
        <h1>Login</h1>
        <form onSubmit={this.login.bind(this)}>
          <p>Username</p>
          <input type='text' onChange={this.updateUsername.bind(this)}/>
          <p>Password</p>
          <input type='text' onChange={this.updatePassword.bind(this)}/>
          <input type='submit' value='Login'/>
        </form>
      </div>
    )
  }
}
