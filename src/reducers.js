import { combineReducers } from 'redux'
import { handleAction, handleActions, combineActions } from 'redux-actions'
import { FILTER_RESOURCES, RETRIEVE_RESOURCES, CREATE_RESOURCE, REGISTER_PENDING, DEREGISTER_PENDING } from './actions'

export const filter = handleAction(FILTER_RESOURCES, (state, action) => (typeof action.payload !== 'undefined') ? action.payload : state, '')

export const resources = handleAction(RETRIEVE_RESOURCES, {
    // success
    next : (state, action)  => Object.assign({}, state, {
        items: action.payload.resources,
        lastUpdated: action.payload.receivedAt
    })
}, {
    items : [],
    lastUpdated : null
})

const addKeyToImmutable = (immutableObject, keyToAdd) => ({...immutableObject, [keyToAdd] : {}})

const removeKeyFromImmutable = (immutableObject, keyToRemove) => Object.keys(immutableObject).reduce((obj, key) => {
        if (key !== keyToRemove) {
            return { ...obj, [key]: immutableObject[key] }
        }
        return obj
    }, {})

// manage pendingActions
export const pendingActions = handleActions({
    REGISTER_PENDING: {next: (state, action) => addKeyToImmutable(state, action.payload)},
    DEREGISTER_PENDING: {next: (state, action) => removeKeyFromImmutable(state, action.payload)}
}, {})

export const messages = handleAction(combineActions(RETRIEVE_RESOURCES, CREATE_RESOURCE), {
    // success: remove message
    next : (state, action)  => removeKeyFromImmutable(state, action.type),
    // failure: add message
    throw : (state, action) => ({...state, [action.type] : {errorMessage : action.payload.message}})
}, {})

const app = combineReducers({
    filter,
    resources,
    messages,
    pendingActions,
})

export default app
