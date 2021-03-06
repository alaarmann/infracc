import { combineReducers } from 'redux'
import { FILTER_RESOURCES, REFRESH_RESOURCES, REQUEST_RESOURCES, RECEIVE_RESOURCES, ERROR_RESOURCES, REQUEST_CREATE_RESOURCE, RECEIVE_CREATE_RESOURCE, ERROR_CREATE_RESOURCE } from './actions'

function filter(state = '', action) {
  switch (action.type) {
    case FILTER_RESOURCES:
      return action.filterExpression
    default:
      return state
  }
}

function resources(state = {
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

function creator(state = {
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

function messages(state = {
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

const app = combineReducers({
    filter,
    resources,
    creator,
    messages
})

export default app
