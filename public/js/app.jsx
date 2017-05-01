import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import contactsIndexContainer from './components/contacts/contactsIndexContainer.jsx'
import contactsShowContainer from './components/contacts/contactsShowContainer.jsx'
import Home from './components/home/home.jsx'
import configureStore from './store/store.js'

const store = configureStore()

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={Home} />
          <Route path='/contacts' component={contactsIndexContainer} />
          <Route path='/contacts/:id' component={contactsShowContainer} />
        </Router>
      </Provider>
    )
  }
}
