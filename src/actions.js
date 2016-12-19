import fetch from 'isomorphic-fetch'

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

export function fetchResources() {

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestResources())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`http://localhost:8080/infracc/resources`)
            .then(response => response.json())
            .then(json =>

                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                dispatch(receiveResources(json))
            )

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}