/**
 * Created by al on 23.03.17.
 */
import {call, put} from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import createSagaMiddleware from 'redux-saga'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import { startAsync, RETRIEVE_RESOURCES, START_ASYNC } from './actions'
import { retrieveResources } from './sagas'
import saga from './sagas'

describe('retrieveResources', () => {

    const generator = retrieveResources()

    it('calls fetch()', () => {
        expect(generator.next().value).toEqual(call(fetch, 'http://localhost:8080/infracc/resources'))
    })

    it('calls another function', () => {
        expect(generator.next().value.CALL).toBeDefined()
    })

    it('puts action RETRIEVE_RESOURCES', () => {
        const putAction = generator.next().value
        expect(putAction.PUT).toBeDefined()
        expect(putAction.PUT.action).toBeDefined()
        expect(putAction.PUT.action.type).toEqual(RETRIEVE_RESOURCES)
    })
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
        sagaMiddleware.run(saga)

        store.dispatch(startAsync(RETRIEVE_RESOURCES))

        const expectedActionCount = 2

        return new Promise((resolve) =>
            store.subscribe(
                () => store.getActions().length === expectedActionCount && resolve()
            )
        ).then(() => {

            expect(store.getActions().length).toEqual(expectedActionCount)
            expect(store.getActions()[0].type).toEqual(START_ASYNC)
            expect(store.getActions()[1].type).toEqual(RETRIEVE_RESOURCES)
            expect(store.getActions()[1].payload.resources).toEqual(JSON.parse(resourcesPayload))
        })

    })


})