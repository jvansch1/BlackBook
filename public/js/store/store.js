import { createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers/rootReducer.js'

const configureStore = (preloadedState = {}) => createStore(rootReducer, preloadedState, applyMiddleware(thunk), autoRehydrate())


export default configureStore
