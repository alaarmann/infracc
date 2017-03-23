import { call, put, takeEvery } from 'redux-saga/effects'
import { RETRIEVE_RESOURCES, START_ASYNC, registerPending, deregisterPending } from './actions'
import fetch from 'isomorphic-fetch'

// worker Saga
export function* retrieveResources(action) {
    try {
        yield put(registerPending(RETRIEVE_RESOURCES))
        const response = yield call(fetch, 'http://localhost:8080/infracc/resources')
        const resources = yield call(() => response.json())
        yield put({type: RETRIEVE_RESOURCES, payload: {resources, receivedAt : Date.now()}})
    } catch (e) {
        yield put({type: RETRIEVE_RESOURCES, error: true, payload: e});
    } finally {
        yield put(deregisterPending(RETRIEVE_RESOURCES))
    }
}

function* saga() {
    yield takeEvery(action =>
    action.type === START_ASYNC && action.payload && action.payload.actionType === RETRIEVE_RESOURCES,
        retrieveResources);
}


export default saga;