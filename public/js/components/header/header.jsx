import React from 'react'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='header'>
        <img src='/static/img/PetitFormalLogo.png' />
      </div>
    )
  }
}
