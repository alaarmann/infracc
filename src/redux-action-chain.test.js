import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createReduxActionChainMiddleware from './redux-action-chain'
import reduxPayloadThunkMiddleware from './redux-payload-thunk'
import { createAction } from 'redux-actions'



describe('reduxActionChainMiddleware', () => {

    it('registers pending state before starting async action', () => {
        const events = []
        const registerPending =  createAction('REGISTER_PENDING',
            (actionType) => () => {
                // event is pushed at dispatch time rather than create time due to redux-payload-thunk
                events.push('REGISTER_PENDING dispatched')
                return actionType
            })

        const deregisterPending =  createAction('DEREGISTER_PENDING',
            (actionType) => () => {
                // event is pushed at dispatch time rather than create time due to redux-payload-thunk
                events.push('DEREGISTER_PENDING dispatched')
                return actionType
            })

        const reduxActionChainMiddleware = createReduxActionChainMiddleware()
        const middlewares = [ thunk, reduxActionChainMiddleware, reduxPayloadThunkMiddleware, promiseMiddleware ]
        const mockStore = configureMockStore(middlewares)

        const asyncAction =  createAction('ASYNC_ACTION', (argument) => () => new Promise((resolve) => {
                events.push('ASYNC_ACTION started')
                setTimeout(() => {
                    events.push('ASYNC_ACTION successfully completed')
                    resolve(`Resolved: ${argument}`);
                }, 0)
            }
        ),
            () => ({'before' : registerPending('ASYNC_ACTION'), 'next' : deregisterPending('ASYNC_ACTION'), 'throw' : deregisterPending('ASYNC_ACTION')})
        )

        const store = mockStore({})

        return store.dispatch(asyncAction('Very good argument!')).then(

            () => {

                // return of async actions
                expect(events[0]).toBe('REGISTER_PENDING dispatched')
                expect(events[1]).toBe('ASYNC_ACTION started')
                expect(events[2]).toBe('ASYNC_ACTION successfully completed')
                expect(events[3]).toBe('DEREGISTER_PENDING dispatched')

                // mockStore offers triggered actions via getActions()
                // this order is no guarantee that pending state is registered before async action is started
                // and deregistering takes place after async actio is completed
                expect(store.getActions()[0].type).toBe('REGISTER_PENDING')
                expect(store.getActions()[0].payload).toBe('ASYNC_ACTION')
                expect(store.getActions()[1].type).toBe('ASYNC_ACTION')
                expect(store.getActions()[2].type).toBe('DEREGISTER_PENDING')
                expect(store.getActions()[2].payload).toBe('ASYNC_ACTION')
            }, () => { throw new Error()})

    })

    it('makes sure that next async action is startet after current action has settled', () => {
        const events = []
        const registerPending =  createAction('REGISTER_PENDING',
            (actionType) => () => {
                // event is pushed at dispatch time rather than create time due to redux-payload-thunk
                events.push('REGISTER_PENDING dispatched')
                return actionType
            })

        const deregisterPending =  createAction('DEREGISTER_PENDING',
            (actionType) => () => {
                // event is pushed at dispatch time rather than create time due to redux-payload-thunk
                events.push('DEREGISTER_PENDING dispatched')
                return actionType
            })

        const reduxActionChainMiddleware = createReduxActionChainMiddleware()
        const middlewares = [ thunk, reduxActionChainMiddleware, reduxPayloadThunkMiddleware, promiseMiddleware ]
        const mockStore = configureMockStore(middlewares)

        const asyncAction =  createAction('ASYNC_ACTION', (argument) => () => new Promise((resolve) => {
                events.push('ASYNC_ACTION started')
                setTimeout(() => {
                    events.push('ASYNC_ACTION successfully completed')
                    resolve(`Resolved: ${argument}`);
                }, 0)
            }
        ),
            () => ({'before' : registerPending('ASYNC_ACTION'), 'next' : deregisterPending('ASYNC_ACTION'), 'throw' : deregisterPending('ASYNC_ACTION')})
        )

        const nextAsyncAction =  createAction('NEXT_ASYNC_ACTION', (argument) => () => new Promise((resolve) => {
                events.push('NEXT_ASYNC_ACTION started')
                setTimeout(() => {
                    events.push('NEXT_ASYNC_ACTION successfully completed')
                    resolve(`Resolved: ${argument}`);
                }, 0)
            }
        ),
            () => ({'before' : registerPending('NEXT_ASYNC_ACTION'), 'next' : deregisterPending('NEXT_ASYNC_ACTION'), 'throw' : deregisterPending('NEXT_ASYNC_ACTION')})
        )

        const store = mockStore({})

        return store.dispatch(asyncAction('Very good argument!')).then(
            () =>  store.dispatch(nextAsyncAction('Another good argument!'))
        ).then(

            () => {

                // return of async actions
                expect(events[0]).toBe('REGISTER_PENDING dispatched')
                expect(events[1]).toBe('ASYNC_ACTION started')
                expect(events[2]).toBe('ASYNC_ACTION successfully completed')
                expect(events[3]).toBe('DEREGISTER_PENDING dispatched')
                expect(events[4]).toBe('REGISTER_PENDING dispatched')
                expect(events[5]).toBe('NEXT_ASYNC_ACTION started')
                expect(events[6]).toBe('NEXT_ASYNC_ACTION successfully completed')
                expect(events[7]).toBe('DEREGISTER_PENDING dispatched')

                // mockStore offers triggered actions via getActions()
                // this order is no guarantee that pending state is registered before async action is started
                // and deregistering takes place after async actio is completed
                expect(store.getActions()[0].type).toBe('REGISTER_PENDING')
                expect(store.getActions()[0].payload).toBe('ASYNC_ACTION')
                expect(store.getActions()[1].type).toBe('ASYNC_ACTION')
                expect(store.getActions()[2].type).toBe('DEREGISTER_PENDING')
                expect(store.getActions()[2].payload).toBe('ASYNC_ACTION')
                expect(store.getActions()[3].type).toBe('REGISTER_PENDING')
                expect(store.getActions()[3].payload).toBe('NEXT_ASYNC_ACTION')
                expect(store.getActions()[4].type).toBe('NEXT_ASYNC_ACTION')
                expect(store.getActions()[5].type).toBe('DEREGISTER_PENDING')
                expect(store.getActions()[5].payload).toBe('NEXT_ASYNC_ACTION')
            }, () => { throw new Error()})

    })
})
