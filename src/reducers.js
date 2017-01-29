import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'
import { FILTER_RESOURCES, REFRESH_RESOURCES, REQUEST_RESOURCES, RECEIVE_RESOURCES, ERROR_RESOURCES, REQUEST_CREATE_RESOURCE, RECEIVE_CREATE_RESOURCE, ERROR_CREATE_RESOURCE, CREATE_RESOURCE } from './actions'

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

export function messages(state = {
    errorMessage: null
}, action) {
    switch (action.type) {
        case ERROR_CREATE_RESOURCE:
            return {...state,
                errorMessage: action.errorMessage };
        case ERROR_RESOURCES:
            return {...state,
                errorMessage: action.errorMessage };
        default:
            return state
    }
}

const removeKeyFromImmutable = (immutableObject, keyToRemove) => Object.keys(immutableObject).reduce((obj, key) => {
        if (key !== keyToRemove) {
            return { ...obj, [key]: immutableObject[key] }
        }
        return obj
    }, {})


// remove from pendingActions
export const pendingActions = handleAction(CREATE_RESOURCE, {
    next : (state, action) => removeKeyFromImmutable(state, action.type),
    throw : (state, action) => removeKeyFromImmutable(state, action.type)
}, {})

export const actionMessages = handleAction(CREATE_RESOURCE, {
    // success: remove message
    next : (state, action)  => removeKeyFromImmutable(state, action.type),
    // failure: add message
    throw : (state, action) => ({...state, CREATE_RESOURCE : {errorMessage : action.payload.message}})
}, {})

const app = combineReducers({
    filter,
    resources,
    creator,
    messages,
    pendingActions,
    actionMessages
})

export default app
