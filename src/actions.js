import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

// Action types
export const FILTER_RESOURCES = 'FILTER_RESOURCES'
export const RETRIEVE_RESOURCES = 'RETRIEVE_RESOURCES'
export const CREATE_RESOURCE = 'CREATE_RESOURCE'
export const DELETE_RESOURCE ='DELETE_RESOURCE'
export const REGISTER_PENDING = 'REGISTER_PENDING'
export const DEREGISTER_PENDING = 'DEREGISTER_PENDING'
export const OPEN_COMPONENT = 'OPEN_COMPONENT'
export const CLOSE_COMPONENT = 'CLOSE_COMPONENT'

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
            }).then((response) => {
            if (response.ok) {
                return response
            } else {
                // TODO: specific error message
                throw new Error('Resource creation has failed')
            }
        })
    }
}

const createCallDeleteResource = function (resource) {
    return function () {
        return fetch(`http://localhost:8080/infracc/resources/${resource['_id']}`,
            {
                method: 'DELETE'
            }).then((response) => {
            if (response.ok) {
                return response
            } else {
                // TODO: specific error message
                throw new Error('Resource deletion has failed')
            }
        })
    }
}

const createCallRetrieveResources = function () {
    return function () {
        return fetch('http://localhost:8080/infracc/resources')
            .then(response => response.json())
            .then(resources => ({
                resources,
                receivedAt : Date.now() })
            )
    }
}

export const addResource = createAction(CREATE_RESOURCE, createCallCreateResource)
export const retrieveResources = createAction(RETRIEVE_RESOURCES, createCallRetrieveResources)
export const deleteResource = createAction(DELETE_RESOURCE, createCallDeleteResource)

export const registerPending = createAction(REGISTER_PENDING)
export const deregisterPending = createAction(DEREGISTER_PENDING)

export const openComponent = createAction(OPEN_COMPONENT)
export const closeComponent = createAction(CLOSE_COMPONENT)
