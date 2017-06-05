import React from 'react'
import { Link } from 'react-router-dom'

export default class Login extends React.Component {
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

  login(e) {
    e.preventDefault()
    this.props.login(this.state).then((session) => {
      if (session.type === "RECEIVE_ERRORS") {
        this.setState({username: '', password: ''});
      } else {
        // hashHistory.push('/contacts')
      }
    })
  }

  renderErrors() {
    if (this.props.currentUser.errors) {
      return(
        <ul id='error-list'>
          <li id='error'>{this.props.currentUser.errors[0]}</li>
        </ul>
      )
    }
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
          <Link to='/'>
            <img className='auth-img' src='/static/img/LogoMakr-layerExport.png' />
          </Link>
          <h1 className='auth-title'>Login</h1>
          {this.renderErrors()}
          <form onSubmit={this.login.bind(this)}>
            <div className='input-container'>
              <p>Username</p>
              <input type='text' onChange={this.updateUsername.bind(this)}/>
            </div>
            <div className='input-container'>
              <p>Password</p>
              <input type='text' onChange={this.updatePassword.bind(this)}/>
            </div>
            <div className='auth-button' onClick={this.login.bind(this)}>Login</div>
          </form>
          <p className='auth-link'>Not a user? <Link to='/signup'><u>Sign Up!</u></Link></p>
        </div>
      </div>
    )
  }
}
