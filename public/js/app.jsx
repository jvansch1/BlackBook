import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import contactsIndexContainer from './components/contacts/contactsIndexContainer.jsx'
import contactsShowContainer from './components/contacts/contactsShowContainer.jsx'
import SignUpContainer from './components/auth/signupContainer.jsx'
import LoginContainer from './components/auth/loginContainer.jsx'
import LandingContainer from './components/landing/landingContainer.jsx'
import configureStore from './store/store.js'
import { persistStore, autoRehydrate } from 'redux-persist'
import { saveState } from './localStorage.js'

let store;
if (window.currentUser) {
  store = configureStore();
}
else {
  store = configureStore();
}

persistStore(store)

window.store = store

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  _redirectIfLoggedIn(nextState, replace) {
    if (store.getState().session.username) {
      replace('/contacts')
    }
  }

  _checkIfLoggedIn(nextState, replace) {
    if (!store.getState().session.username) {
      replace('/login')
    }
  }

  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path='/' component={LandingContainer}/>
            <Route path='/login' component={LoginContainer}/>
            <Route path='/signup' component={SignUpContainer}/>
            <Route path='/contacts' component={contactsIndexContainer} />
            <Route path='/contacts/:id' component={contactsShowContainer} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
