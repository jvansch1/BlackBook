import React from 'react'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h1>Signup</h1>
        <form>
          <p>Username</p>
          <input type='text'/>
          <p>Password</p>
          <input type='text'/>
        </form>
      </div>
    )
  }
}
