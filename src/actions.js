
// Action types
export const FILTER_RESOURCES = 'FILTER_RESOURCES';
export const ADD_RESOURCE = 'ADD_RESOURCES';
export const REFRESH_RESOURCES = 'REFRESH_RESOURCES';
export const REQUEST_RESOURCES = 'REQUEST_RESOURCES';
export const RECEIVE_RESOURCES = 'RECEIVE_RESOURCES';

// Action creators
export function filterResources(filterExpression) {
  return { type: FILTER_RESOURCES, filterExpression };
}

export function addResource(resource) {
  return { type: ADD_RESOURCE, resource };
}

export function refreshResources() {
  return { type: REFRESH_RESOURCES };
}

export function requestResources() {
  return { type: REQUEST_RESOURCES };
}

export function receiveResources(resources) {
    return { type: RECEIVE_RESOURCES,
        resources,
        receivedAt : Date.now() };
}
