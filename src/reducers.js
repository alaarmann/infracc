import { combineReducers } from 'redux'
import { FILTER_RESOURCES, ADD_RESOURCE } from './actions'

function filter(state = '', action) {
  switch (action.type) {
    case FILTER_RESOURCES:
      return action.filterExpression
    default:
      return state
  }
}
const initialResources=[{_id: '001', key : 'Resource01'}, {_id: '002', key : 'Resource02'}, {_id: '003', key : 'Resource03'}];
function resources(state = initialResources, action) {
  switch (action.type) {
    case ADD_RESOURCE:
      return [...state, action.resource]
    default:
      return state
  }
}
const app = combineReducers({
  filter,
  resources
})

export default app
