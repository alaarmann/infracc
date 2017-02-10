import React from 'react';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme';
import ActionActivities from './ActionActivities'
import Activities from './Activities'
import * as actions from './actions'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createRegisterPendingMiddleware from './register-pending'

function setup(state) {
    const middlewares = [ thunk, createRegisterPendingMiddleware({dispatchBefore : actions.registerPending, dispatchAfter : actions.deregisterPending}), promiseMiddleware ]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore(state)
    const dispatch = jest.fn(store.dispatch)
    store.dispatch = dispatch
    const enzymeWrapper = mount(<Provider store={store}>
        <ActionActivities />
    </Provider>)

    return {
        store,
        enzymeWrapper,
        dispatch
    }

}

describe('mapStateToProps', () => {

    it('maps initial State', () => {


        const initialState = {
            pendingActions : {},
        resources: {
            isFetching: false,
            needsRefresh: true,
            items: []
        }
    }

    const { enzymeWrapper } = setup(initialState)

    const componentWrapper = enzymeWrapper.find(Activities)
    expect(componentWrapper.prop('isCreateButtonDisabled')).toBe(false)
    expect(componentWrapper.prop('isRefreshButtonDisabled')).toBe(false)
    expect(componentWrapper.prop('lastUpdated')).not.toBeDefined()
    });

    it('maps modified State', () => {

        const receivedAt = new Date(2017, 1, 21, 22, 40, 52, 123)

        const initialState = {
            pendingActions : {[actions.CREATE_RESOURCE] : {}, [actions.RETRIEVE_RESOURCES] : {}},
            resources: {
                items: [],
                lastUpdated : receivedAt
            }
        }

        const { enzymeWrapper } = setup(initialState)

        const componentWrapper = enzymeWrapper.find(Activities)
        expect(componentWrapper.prop('isCreateButtonDisabled')).toBe(true)
        expect(componentWrapper.prop('isRefreshButtonDisabled')).toBe(true)
        expect(componentWrapper.prop('lastUpdated')).toEqual(receivedAt)
    });
});

describe('mapDispatchToProps', () => {

    it('maps onCreateButtonClick', () => {


        const initialState = {
            pendingActions : {},
            resources: {
                items: []
            }
        }

        const { enzymeWrapper, store, dispatch } = setup(initialState)

        const componentWrapper = enzymeWrapper.find(Activities)
        const onCreateButtonClick = componentWrapper.prop('onCreateButtonClick')
        expect(onCreateButtonClick).toBeInstanceOf(Function)
        return onCreateButtonClick('aNewResource').then(
            () => {
                // no test for particular actions triggered, just make sure any action has been triggered
                expect(dispatch).toHaveBeenCalledTimes(2)
                expect(store.getActions().length).toBeGreaterThan(0)
            }
        )
    });

    it('maps onRefreshButtonClick', () => {


        const initialState = {
            pendingActions : {},
            resources: {
                items: []
            }
        }

        const { enzymeWrapper, store, dispatch } = setup(initialState)

        const componentWrapper = enzymeWrapper.find(Activities)
        const onRefreshButtonClick = componentWrapper.prop('onRefreshButtonClick')
        expect(onRefreshButtonClick).toBeInstanceOf(Function)
        return onRefreshButtonClick().then(
            () => {
                // no test for particular actions triggered, just make sure any action has been triggered
                expect(dispatch).toHaveBeenCalledTimes(1)
                expect(store.getActions().length).toBeGreaterThan(0)
            }
        )

    });

});
