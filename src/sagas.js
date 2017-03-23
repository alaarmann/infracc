import { call, put, takeEvery } from 'redux-saga/effects'
import { RETRIEVE_RESOURCES, RETRIEVE_RESOURCES_SIMPLE } from './actions'
import fetch from 'isomorphic-fetch'

// worker Saga
export function* retrieveResources(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8080/infracc/resources')
        const resources = yield call(() => response.json())
        yield put({type: RETRIEVE_RESOURCES, payload: {resources, receivedAt : Date.now()}})
    } catch (e) {
        yield put({type: RETRIEVE_RESOURCES, error: true, payload: e});
    }
}

function* saga() {
    yield takeEvery(action =>
    action.type === RETRIEVE_RESOURCES_SIMPLE && typeof action.payload === 'undefined',
        retrieveResources);
}


export default saga;