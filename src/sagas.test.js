/**
 * Created by al on 23.03.17.
 */
import {call, put} from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { RETRIEVE_RESOURCES } from './actions'
import { retrieveResources } from './sagas'

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