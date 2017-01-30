import { combineReducers } from 'redux'
import { handleAction, handleActions, combineActions } from 'redux-actions'
import { FILTER_RESOURCES, REFRESH_RESOURCES, RETRIEVE_RESOURCES, REQUEST_RESOURCES, RECEIVE_RESOURCES, ERROR_RESOURCES, REQUEST_CREATE_RESOURCE, RECEIVE_CREATE_RESOURCE, ERROR_CREATE_RESOURCE, CREATE_RESOURCE, REGISTER_PENDING } from './actions'

export const filter = handleAction(FILTER_RESOURCES, (state, action) => action.payload || state, '')

export function resources(state = {
    isFetching: false,
    needsRefresh: true,
    items: []
}, action) {
  switch (action.type) {
      case REFRESH_RESOURCES:
          return Object.assign({}, state, {
              needsRefresh: true
          });
      case REQUEST_RESOURCES:
          return Object.assign({}, state, {
              isFetching: true,
              needsRefresh: false
          })
      case RECEIVE_RESOURCES:
          return Object.assign({}, state, {
              isFetching: false,
              needsRefresh: false,
              items: action.resources,
              lastUpdated: action.receivedAt
          })
      case ERROR_RESOURCES:
          return {...state,
              isFetching: false,
              needsRefresh: false
          }
// TODO: set needsRefresh with CREATE_RESOURCE (success)
      case RECEIVE_CREATE_RESOURCE:
          return {...state,
              needsRefresh: true };


      default:
      return state
  }
}

export function creator(state = {
    isFetching: false
}, action) {
    switch (action.type) {
        case REQUEST_CREATE_RESOURCE:
            return {...state,
                isFetching: true };
        case RECEIVE_CREATE_RESOURCE:
            return {...state,
                isFetching: false };
        case ERROR_CREATE_RESOURCE:
            return {...state,
                isFetching: false };
        default:
            return state
    }
}

const addKeyToImmutable = (immutableObject, keyToAdd) => ({...immutableObject, keyToAdd : {}})

const removeKeyFromImmutable = (immutableObject, keyToRemove) => Object.keys(immutableObject).reduce((obj, key) => {
        if (key !== keyToRemove) {
            return { ...obj, [key]: immutableObject[key] }
        }
        return obj
    }, {})

// manage pendingActions
export const pendingActions = handleActions({
    CREATE_RESOURCE: {
        next: (state, action) => removeKeyFromImmutable(state, action.type),
        throw: (state, action) => removeKeyFromImmutable(state, action.type)
    },
    REGISTER_PENDING: (state, action) => addKeyToImmutable(state, action.payload)
}, {})

export const messages = handleAction(combineActions(RETRIEVE_RESOURCES, CREATE_RESOURCE), {
    // success: remove message
    next : (state, action)  => removeKeyFromImmutable(state, action.type),
    // failure: add message
    throw : (state, action) => ({...state, [action.type] : {errorMessage : action.payload.message}})
}, {})

const app = combineReducers({
    filter,
    resources,
    creator,
    messages,
    pendingActions,
})

export default app
