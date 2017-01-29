import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import app from './reducers'
import { fetchResourcesIfNeeded } from './actions'

const loggerMiddleware = createLogger()
const store = createStore(app,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        promiseMiddleware,
        loggerMiddleware // neat middleware that logs actions
    ))
store.dispatch(fetchResourcesIfNeeded()).then(() =>
    console.log(store.getState())
)
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
