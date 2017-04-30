import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import contactsIndex from './components/contacts/contactsIndex.jsx'
export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Router history={hashHistory}>
        <Route path='/' component={contactsIndex} />
      </Router>
    )
  }
}
