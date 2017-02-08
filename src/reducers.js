import { combineReducers } from 'redux'
import { handleAction, handleActions, combineActions } from 'redux-actions'
import { FILTER_RESOURCES, REFRESH_RESOURCES, RETRIEVE_RESOURCES, REQUEST_RESOURCES, RECEIVE_RESOURCES, ERROR_RESOURCES, CREATE_RESOURCE, REGISTER_PENDING, DEREGISTER_PENDING } from './actions'

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


      default:
      return state
  }
}

const addKeyToImmutable = (immutableObject, keyToAdd) => ({...immutableObject, [keyToAdd] : {}})

const removeKeyFromImmutable = (immutableObject, keyToRemove) => Object.keys(immutableObject).reduce((obj, key) => {
        if (key !== keyToRemove) {
            return { ...obj, [key]: immutableObject[key] }
        }
        return obj
    }, {})

// manage pendingActions
export const pendingActions = handleActions({
    REGISTER_PENDING: {next: (state, action) => addKeyToImmutable(state, action.payload)},
    DEREGISTER_PENDING: {next: (state, action) => removeKeyFromImmutable(state, action.payload)}
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
    messages,
    pendingActions,
})

export default app
