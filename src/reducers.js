import { combineReducers } from 'redux'
import { handleAction, handleActions, combineActions } from 'redux-actions'
import { FILTER_RESOURCES, RETRIEVE_RESOURCES, CREATE_RESOURCE, REGISTER_PENDING, DEREGISTER_PENDING, OPEN_RESOURCE_EDITOR, CLOSE_RESOURCE_EDITOR, OPEN_COMPONENT, CLOSE_COMPONENT } from './actions'
import { RESOURCE_EDITOR } from './ResourceEditor'

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
    [REGISTER_PENDING]: {next: (state, action) => addKeyToImmutable(state, action.payload)},
    [DEREGISTER_PENDING]: {next: (state, action) => removeKeyFromImmutable(state, action.payload)}
}, {})

export const messages = handleActions({
    [combineActions(RETRIEVE_RESOURCES, CREATE_RESOURCE)] : {
        // success: remove message
        next: (state, action) => removeKeyFromImmutable(state, action.type),
        // failure: add message
        throw: (state, action) => ({...state, [action.type]: {errorMessage: action.payload.message}})
    },
    [REGISTER_PENDING] : {next : (state, action) => removeKeyFromImmutable(state, action.payload)},
    [CLOSE_COMPONENT] : {next : (state, action) => action.payload === RESOURCE_EDITOR ? removeKeyFromImmutable(state, CREATE_RESOURCE) : state}
}, {})

export const isResourceEditorOpen = handleActions({
    [CLOSE_RESOURCE_EDITOR] : {next : (state, action) => false},
    [OPEN_RESOURCE_EDITOR] : {next : (state, action) => true}
}, false)

export const openComponents = handleActions({
    [CLOSE_COMPONENT] : {next : (state, action) => removeKeyFromImmutable(state, action.payload)},
    [OPEN_COMPONENT] : {next : (state, action) => addKeyToImmutable(state, action.payload)}
}, {})

const app = combineReducers({
    filter,
    resources,
    messages,
    pendingActions,
    isResourceEditorOpen,
    openComponents
})

export default app
