import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer.js'

const configureStore = (preloadedState = {}) => createStore(rootReducer, preloadedState, applyMiddleware(thunk))

export default configureStore
