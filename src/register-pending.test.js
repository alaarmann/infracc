import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createRegisterPendingMiddleware from './register-pending'
import { createAction } from 'redux-actions'



describe('registerPendingAsyncMiddleware', () => {

    it('registers pending state before starting asyn action', () => {
        const events = []
        const registerPending =  () => {
            events.push('REGISTER_PENDING dispatched')
            return {
                type : 'REGISTER_PENDING'
            }
        }
        const registerPendingMiddleware = createRegisterPendingMiddleware(registerPending)
        const middlewares = [ thunk, registerPendingMiddleware, promiseMiddleware ]
        const mockStore = configureMockStore(middlewares)

        const asyncAction =  createAction('ASYNC_ACTION', (argument) => () => new Promise((resolve) => {
            events.push('ASYNC_ACTION started')
                setTimeout(() => {
                    return resolve(`Resolved: ${argument}`);
                }, 0)
            }
        ))

        const store = mockStore({})

        return store.dispatch(asyncAction('Very good argument!'))
            .then(() => { // return of async actions
                console.log (events)
                expect(events[0]).toBe('REGISTER_PENDING dispatched')
                expect(events[1]).toBe('ASYNC_ACTION started')

                // mockStore offers triggered actions via getActions()
                // this order is no guarantee that pending state is registered before async action is started
                expect(store.getActions()[0].type).toBe('REGISTER_PENDING')
                expect(store.getActions()[1].type).toBe('ASYNC_ACTION')
            })


    })
})
