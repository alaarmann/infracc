import * as actions from './actions'
import { isFSA } from 'flux-standard-action'
// for async tests
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import nock from 'nock'
import createRegisterPendingMiddleware from './register-pending'

describe('filterResources', () => {
    it('creates an action to filter resources', () => {
        const filterExpression = 'anExpression'
        const expectedAction = {
            type: actions.FILTER_RESOURCES,
            payload : filterExpression
        }
        expect(actions.filterResources(filterExpression)).toEqual(expectedAction)
    })
    it('is FSA compliant', () => {
        expect(isFSA(actions.filterResources())).toBe(true)
        expect(isFSA(actions.filterResources('anExpression'))).toBe(true)
    })
})

describe('registerPending', () => {
    it('creates an action for registering pending state of an async action', () => {
        const expectedAction = {
            type: actions.REGISTER_PENDING
        }
        expect(actions.registerPending()).toEqual(expectedAction)
        expect(isFSA(actions.registerPending())).toBe(true)
    })
})

describe('deregisterPending', () => {
    it('creates an action for deregistering an async action from pending state', () => {
        const expectedAction = {
            type: actions.DEREGISTER_PENDING
        }
        expect(actions.deregisterPending()).toEqual(expectedAction)
        expect(isFSA(actions.deregisterPending())).toBe(true)
    })
})

describe('Asyncronous actions', () => {
    const middlewares = [ thunk, createRegisterPendingMiddleware({dispatchBefore : actions.registerPending, dispatchAfter : actions.deregisterPending}), promiseMiddleware ]
    const mockStore = configureMockStore(middlewares)

    afterEach(() => {
        nock.cleanAll()
    })

    describe('retrieveResources', () => {

        it('creates RETRIEVE_RESOURCES and executes fetch', () => {
            const resourcesPayload = '[{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0},{"_id":"587fdfcb9a20f21027a5b970","key":"Another Resource","__v":0}]'
            nock('http://localhost:8080')
                .get('/infracc/resources')
                .reply(200, resourcesPayload)

            const initialState = {
                resources: {
                    items: []
                }
            }

            const store = mockStore(initialState)

            return store.dispatch(actions.retrieveResources())
                .then(() => { // return of async actions
                    // mockStore offers triggered actions via getActions()
                    expect(store.getActions()[0]).toEqual({type: actions.REGISTER_PENDING, payload : actions.RETRIEVE_RESOURCES})
                    expect(store.getActions()[1].type).toEqual(actions.RETRIEVE_RESOURCES)
                    expect(store.getActions()[1].error).notToBeDefined
                    expect(store.getActions()[1].payload.receivedAt).toBeDefined
                    expect(store.getActions()[1].payload.resources).toEqual(JSON.parse(resourcesPayload))
                    expect(store.getActions()[2]).toEqual({type: actions.DEREGISTER_PENDING, payload : actions.RETRIEVE_RESOURCES})

                })


        })
    })

    describe('addResource', () => {
        it('creates CREATE_RESOURCE and executes fetch', () => {
            const newResource = {prop1 : 'val1', prop2 : 'val2'}
            const payload = 'prop1=val1&prop2=val2';
            nock('http://localhost:8080')
                .post('/infracc/resources', payload)
                .reply(200, {})

            const store = mockStore({ creator: {isFetching : false} })

            return store.dispatch(actions.addResource(newResource))
                .then(() => { // return of async actions
                    expect(store.getActions()[0].type).toEqual(actions.REGISTER_PENDING)
                    expect(store.getActions()[1].type).toEqual(actions.CREATE_RESOURCE)
                    expect(store.getActions()[1].error).toBeFalsy()
                    expect(store.getActions()[1].payload.status).toEqual(200)
                    expect(store.getActions()[2].type).toEqual(actions.DEREGISTER_PENDING)
                })


        })
    })
})

describe('openResourceEditor', () => {
    it('creates an action to open the resource editor', () => {
        const expectedAction = {
            type: actions.OPEN_RESOURCE_EDITOR
        }
        expect(actions.openResourceEditor()).toEqual(expectedAction)
    })
    it('is FSA compliant', () => {
        expect(isFSA(actions.openResourceEditor())).toBe(true)
    })
})

describe('closeResourceEditor', () => {
    it('creates an action to close the resource editor', () => {
        const expectedAction = {
            type: actions.CLOSE_RESOURCE_EDITOR
        }
        expect(actions.closeResourceEditor()).toEqual(expectedAction)
    })
    it('is FSA compliant', () => {
        expect(isFSA(actions.closeResourceEditor())).toBe(true)
    })
})



