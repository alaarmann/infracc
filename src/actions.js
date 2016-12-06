
// Action types
export const FILTER_RESOURCES = 'FILTER_RESOURCES';
export const ADD_RESOURCE = 'ADD_RESOURCES';

// Action creators
export function filterResources(filterExpression) {
  return { type: FILTER_RESOURCES, filterExpression };
}

export function addResource(resource) {
  return { type: ADD_RESOURCE, resource };
}

