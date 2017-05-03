import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import contactsIndexContainer from './components/contacts/contactsIndexContainer.jsx'
import contactsShowContainer from './components/contacts/contactsShowContainer.jsx'
import SignUpContainer from './components/auth/signupContainer.jsx'
import LoginContainer from './components/auth/loginContainer.jsx'
import configureStore from './store/store.js'
import { persistStore, autoRehydrate } from 'redux-persist'
import { saveState } from './localStorage.js'

let store

if (window.currentUser) {
  store = configureStore()
}
else {
  store = configureStore()
}
persistStore(store)

window.store = store

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  _redirectIfLoggedIn() {
    if (store.getState().session.username) {
      hashHistory.push('/contacts')
    }
  }



  render() {
    return(
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={SignUpContainer} />
          <Route path='/login' component={LoginContainer}/>
          <Route path='/contacts' component={contactsIndexContainer} />
          <Route path='/contacts/:id' component={contactsShowContainer} />
        </Router>
      </Provider>
    )
  }
}
