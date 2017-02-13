import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

// Action types
export const FILTER_RESOURCES = 'FILTER_RESOURCES';
export const RETRIEVE_RESOURCES = 'RETRIEVE_RESOURCES';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const REGISTER_PENDING = 'REGISTER_PENDING';
export const DEREGISTER_PENDING = 'DEREGISTER_PENDING';
export const CLOSE_RESOURCE_EDITOR = 'CLOSE_RESOURCE_EDITOR'
export const OPEN_RESOURCE_EDITOR = 'OPEN_RESOURCE_EDITOR'

// Action creators
export const filterResources = createAction(FILTER_RESOURCES)

const createCallCreateResource = function (resource) {
    return function () {
        const payload = Object.keys(resource).reduce((acc, prop) => `${acc.length > 0 ? acc + '&' : ''}${prop}=${resource[prop]}`, '');
        console.log('payload=' + payload)
        return fetch(`http://localhost:8080/infracc/resources`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
                body: payload
            })
    }
}

const createCallRetrieveResources = function () {
    return function () {
        return fetch(`http://localhost:8080/infracc/resources`)
            .then(response => response.json())
            .then(resources => ({
                resources,
                receivedAt : Date.now() })
            )
    }
}

export const addResource = createAction(CREATE_RESOURCE, createCallCreateResource)
export const retrieveResources = createAction(RETRIEVE_RESOURCES, createCallRetrieveResources)

export const registerPending = createAction(REGISTER_PENDING)
export const deregisterPending = createAction(DEREGISTER_PENDING)

export const closeResourceEditor = createAction(CLOSE_RESOURCE_EDITOR)
export const openResourceEditor = createAction(OPEN_RESOURCE_EDITOR)
