import React from 'react'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='landing'>
        <div id='video-wrapper'>
          <video autoPlay='true' height='100%' loop>
            <source src="https://s3.us-east-2.amazonaws.com/blackbook-dev/699571461.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
    )
  }
}
