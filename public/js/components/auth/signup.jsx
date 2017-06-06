import React from 'react'
import { Link } from 'react-router-dom'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.clearErrors()
  }

  renderErrors() {
    if (this.props.currentUser.errors) {
      return (
        <ul id='error-list'>
          <li id='error'>{this.props.currentUser.errors[0]}</li>
        </ul>
      )
    }
  }

  createUser(e) {
    e.preventDefault()
    this.props.createUser(this.state).then((user, err) => {
      if (user.type === "RECEIVE_ERRORS") {
        this.setState({username: '', password: ''})
      } else {
        this.props.login(user.user).then(() => this.props.history.replace('/contacts'))//() => hashHistory.push('/contacts'))
      }
    })
  }

  updateUsername(e) {
    this.setState({ username: e.currentTarget.value })
  }

  updatePassword(e) {
    this.setState({ password: e.currentTarget.value })
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
          <Link to='/' replace>
            <img className='auth-img' src='/static/img/LogoMakr-layerExport.png' />
          </Link>
          <h1 className='auth-title'>Signup</h1>
          {this.renderErrors()}
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
          <p className='auth-link'>Already a user? <Link to='/login'><u>Login!</u></Link></p>
        </div>
      </div>
    )
  }
}
