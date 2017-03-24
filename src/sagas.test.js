/**
 * Created by al on 23.03.17.
 */
import {call, put, take } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import createSagaMiddleware from 'redux-saga'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import { startAsync, RETRIEVE_RESOURCES, START_ASYNC, registerPending, deregisterPending } from './actions'
import { retrieveResources } from './sagas'

describe('retrieveResources', () => {

    let generator
    beforeEach(() => generator = retrieveResources())

    it('calls fetch()', () => {
        generator.next() // registerPending
        expect(generator.next().value).toEqual(call(fetch, 'http://localhost:8080/infracc/resources'))
        generator.return()
    })

    it('puts action RETRIEVE_RESOURCES', () => {
        generator.next() // registerPending
        generator.next() // call fetch()
        generator.next() // json()
        const putAction = generator.next().value
        expect(putAction.PUT).toBeDefined()
        expect(putAction.PUT.action).toBeDefined()
        expect(putAction.PUT.action.type).toEqual(RETRIEVE_RESOURCES)
    })

    // TODO: test error condition
})

describe('saga', () => {

    it('retrieves resources', () => {
        const resourcesPayload = '[{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0},{"_id":"587fdfcb9a20f21027a5b970","key":"Another Resource","__v":0}]'
        nock('http://localhost:8080')
            .get('/infracc/resources')
            .reply(200, resourcesPayload)

        const sagaMiddleware = createSagaMiddleware()
        const middlewares = [ sagaMiddleware ]
        const mockStore = configureMockStore(middlewares)

        const store = mockStore({})

        const testSaga = function* () {
            yield take(action =>
            action.type === START_ASYNC && action.payload && action.payload.actionType === RETRIEVE_RESOURCES)
            yield call(retrieveResources)
        }
        const task = sagaMiddleware.run(testSaga)

        store.dispatch(startAsync(RETRIEVE_RESOURCES))

        const expectedActionCount = 4

        return task.done.then(() => {

            expect(store.getActions().length).toEqual(expectedActionCount)
            expect(store.getActions()[0].type).toEqual(START_ASYNC)
            expect(store.getActions()[1]).toEqual(registerPending(RETRIEVE_RESOURCES))
            expect(store.getActions()[2].type).toEqual(RETRIEVE_RESOURCES)
            expect(store.getActions()[2].payload.resources).toEqual(JSON.parse(resourcesPayload))
            expect(store.getActions()[3]).toEqual(deregisterPending(RETRIEVE_RESOURCES))
        })

    })


})