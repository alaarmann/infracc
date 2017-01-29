import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

// Action types
export const FILTER_RESOURCES = 'FILTER_RESOURCES';
export const REFRESH_RESOURCES = 'REFRESH_RESOURCES';
export const REQUEST_RESOURCES = 'REQUEST_RESOURCES';
export const RECEIVE_RESOURCES = 'RECEIVE_RESOURCES';
export const ERROR_RESOURCES = 'ERROR_RESOURCES';
export const REQUEST_CREATE_RESOURCE = 'REQUEST_CREATE_RESOURCE';
export const RECEIVE_CREATE_RESOURCE = 'RECEIVE_CREATE_RESOURCE';
export const ERROR_CREATE_RESOURCE = 'ERROR_CREATE_RESOURCE';

// Action creators
export const filterResources = createAction(FILTER_RESOURCES)

export function refreshResources() {
  return { type: REFRESH_RESOURCES };
}

function requestResources() {
  return { type: REQUEST_RESOURCES };
}

function receiveResources(resources) {
    return { type: RECEIVE_RESOURCES,
        resources,
        receivedAt : Date.now() };
}

function handleResourcesError(errorMessage) {
    return { type: ERROR_RESOURCES,
        errorMessage };
}

function requestCreateResource() {
    return { type: REQUEST_CREATE_RESOURCE };
}

function receiveCreateResource() {
    return { type: RECEIVE_CREATE_RESOURCE };
}

function handleCreateResourceError(errorMessage) {
    return { type: ERROR_CREATE_RESOURCE,
        errorMessage };
}

function fetchResources() {

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
            .catch(error => dispatch(handleResourcesError(error.message || 'An error occurred')))

    }

}

function needsFetch(resources) {
    if (resources.isFetching) {
        return false
    } else {
        return resources.needsRefresh
    }
}

export function fetchResourcesIfNeeded() {
    return (dispatch, getState) => {
        if (needsFetch(getState().resources)) {
            return dispatch(fetchResources())
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}

export function addResource(resource) {

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestCreateResource())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        const payload = Object.keys(resource).reduce((acc, prop) =>  `${acc.length > 0 ? acc + '&' : ''}${prop}=${resource[prop]}`, '');
        console.log('payload=' + payload)
        return fetch(`http://localhost:8080/infracc/resources`,
            {method: 'POST',
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'},
                body: payload})
            .then(response => dispatch(receiveCreateResource()),
                error => dispatch(handleCreateResourceError(error.message || 'An error occurred')))

    }

}
