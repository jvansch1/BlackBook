import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import contactsIndex from './components/contacts/contactsIndex.jsx'
import Home from './components/home/home.jsx'
export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Router history={hashHistory}>
        <Route path='/' component={Home} />
        <Route path='/contacts' component={contactsIndex} />
      </Router>
    )
  }
}
