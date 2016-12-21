import { combineReducers } from 'redux'
import { FILTER_RESOURCES, ADD_RESOURCE, REFRESH_RESOURCES, REQUEST_RESOURCES, RECEIVE_RESOURCES } from './actions'

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
    case ADD_RESOURCE:
      return Object.assign({}, state, {
          isFetching: false,
          needsRefresh: false,
          items: [...state.items, action.resource],
          lastUpdated: null
      });
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


      default:
      return state
  }
}
const app = combineReducers({
  filter,
  resources
})

export default app
