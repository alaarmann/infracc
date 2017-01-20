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


describe('Asyncronous actions', () => {
    const middlewares = [ thunk ]
    const mockStore = configureMockStore(middlewares)

    afterEach(() => {
        nock.cleanAll()
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


