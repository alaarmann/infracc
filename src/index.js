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
import { startAsync, registerPending, deregisterPending, RETRIEVE_RESOURCES } from './actions'
import createRegisterPendingMiddleware from './register-pending'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger()
const store = createStore(app,
    applyMiddleware(
        sagaMiddleware,
        thunkMiddleware, // lets us dispatch() functions
        createRegisterPendingMiddleware({ dispatchBefore : registerPending, dispatchAfter : deregisterPending}), // registers pending async actions
        promiseMiddleware,
        loggerMiddleware // neat middleware that logs actions
    ))

sagaMiddleware.run(saga)

store.dispatch(startAsync(RETRIEVE_RESOURCES))

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
