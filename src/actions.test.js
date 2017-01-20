import * as actions from './actions'

// for async tests
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

describe('filterResources', () => {
    it('should create an action to filter resources', () => {
        const filterExpression = 'anExpression'
        const expectedAction = {
            type: actions.FILTER_RESOURCES,
            filterExpression
        }
        expect(actions.filterResources(filterExpression)).toEqual(expectedAction)
    })
})

describe('refreshResources', () => {
    it('should create an action to refresh resources', () => {
        const expectedAction = {
            type: actions.REFRESH_RESOURCES
        }
        expect(actions.refreshResources()).toEqual(expectedAction)
    })
})


describe('Asyncronous actions', () => {
    const middlewares = [ thunk ]
    const mockStore = configureMockStore(middlewares)

    afterEach(() => {
        nock.cleanAll()
    })

    describe('fetchResourcesIfNeeded', () => {

        describe('needsFetch is true', () => {
            it('should create REQUEST_RESOURCES, execute fetch and create action RECEIVE_RESOURCES', () => {
                const resourcesPayload = '[{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0},{"_id":"587fdfcb9a20f21027a5b970","key":"Another Resource","__v":0}]'
                nock('http://localhost:8080')
                    .get('/infracc/resources')
                    .reply(200, resourcesPayload)

                const initialState = {
                    resources: {
                        isFetching: false,
                        needsRefresh: true,
                        items: []
                    }
                }

                const store = mockStore(initialState)

                return store.dispatch(actions.fetchResourcesIfNeeded())
                    .then(() => { // return of async actions
                        // mockStore offers triggered actions via getActions()
                        expect(store.getActions()[0]).toEqual({type: actions.REQUEST_RESOURCES})
                        expect(store.getActions()[1].receivedAt).toBeDefined
                        expect(store.getActions()[1].type).toBe(actions.RECEIVE_RESOURCES)
                        expect(store.getActions()[1].resources).toEqual(JSON.parse(resourcesPayload))

                    })


            })
        })
    })

    describe('needsFetch is false', () => {
        it('should not create any action', () => {

            const initialState = {
                resources: {
                    isFetching: false,
                    needsRefresh: false,
                    items: []
                }
            }

            const store = mockStore(initialState)

            return store.dispatch(actions.fetchResourcesIfNeeded())
                .then(() => { // return of async actions
                    // mockStore offers triggered actions via getActions()
                    expect(store.getActions().length).toBe(0)
                })


        })
    })

    describe('addResource', () => {
        it('should create REQUEST_CREATE_RESOURCE, execute fetch and create action RECEIVE_CREATE_RESOURCE', () => {
            const newResource = {prop1 : 'val1', prop2 : 'val2'}
            const payload = 'prop1=val1&prop2=val2';
            nock('http://localhost:8080')
                .post('/infracc/resources', payload)
                .reply(200, {})

            const expectedActions = [
                { type: actions.REQUEST_CREATE_RESOURCE },
                { type: actions.RECEIVE_CREATE_RESOURCE }
            ]
            const store = mockStore({ creator: {isFetching : false} })

            return store.dispatch(actions.addResource(newResource))
                .then(() => { // return of async actions
                    expect(store.getActions()).toEqual(expectedActions)
                })


        })
    })
})


