import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createRegisterPendingMiddleware from './register-pending'
import { createAction } from 'redux-actions'



describe('registerPendingAsyncMiddleware', () => {

    it('registers pending state before starting asyn action', () => {
        const events = []
        const registerPending =  (actionType) => {
            events.push('REGISTER_PENDING dispatched')
            return {
                type : 'REGISTER_PENDING',
                payload : actionType
            }
        }
        const deregisterPending =  (actionType) => {
            events.push('DEREGISTER_PENDING dispatched')
            return {
                type : 'DEREGISTER_PENDING',
                payload : actionType
            }
        }
        const registerPendingMiddleware = createRegisterPendingMiddleware({dispatchBefore : registerPending, dispatchAfter : deregisterPending})
        const middlewares = [ thunk, registerPendingMiddleware, promiseMiddleware ]
        const mockStore = configureMockStore(middlewares)

        const asyncAction =  createAction('ASYNC_ACTION', (argument) => () => new Promise((resolve) => {
                events.push('ASYNC_ACTION started')
                setTimeout(() => {
                    events.push('ASYNC_ACTION successfully completed')
                    return resolve(`Resolved: ${argument}`);
                }, 0)
            }
        ))

        const store = mockStore({})

        store.dispatch(asyncAction('Very good argument!')).then(

            () => {

                // return of async actions
                console.log(events)
                expect(events[0]).toBe('REGISTER_PENDING dispatched')
                expect(events[1]).toBe('ASYNC_ACTION started')
                expect(events[2]).toBe('ASYNC_ACTION successfully completed')
                expect(events[3]).toBe('DEREGISTER_PENDING dispatched')

                // mockStore offers triggered actions via getActions()
                // this order is no guarantee that pending state is registered before async action is started
                // and deregistering takes place after async actio is completed
                expect(store.getActions()[0].type).toBe('REGISTER_PENDING')
                expect(store.getActions()[1].type).toBe('ASYNC_ACTION')
                expect(store.getActions()[2].type).toBe('DEREGISTER_PENDING')
            })

    })
})
