import React from 'react'
import { hashHistory } from 'react-router'

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
    this.props.createUser(this.state).then(() => hashHistory.push('/contacts'))
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
        <h1>Signup</h1>
        <form onSubmit={this.createUser.bind(this)}>
          <p>Username</p>
          <input type='text' onChange={this.updateUsername.bind(this)} />
          <p>Password</p>
          <input type='password' onChange={this.updatePassword.bind(this)} />
          <input type='submit' value='Sign up'/>
        </form>
      </div>
    )
  }
}
