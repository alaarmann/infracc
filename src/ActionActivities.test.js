import React from 'react';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme';
import ActionActivities from './ActionActivities'
import Activities from './Activities'
import * as actions from './actions'

function setup(state) {
    const mockStore = configureMockStore()
    const dispatch = jest.fn()
    const store = mockStore(state)
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
        creator : {
            isFetching: false,
        },
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
            creator : {
                isFetching: true,
            },
            resources: {
                isFetching: true,
                needsRefresh: false,
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
            creator : {
                isFetching: false,
            },
            resources: {
                isFetching: false,
                needsRefresh: true,
                items: []
            }
        }

        const { enzymeWrapper, store, dispatch } = setup(initialState)

        const componentWrapper = enzymeWrapper.find(Activities)
        const onCreateButtonClick = componentWrapper.prop('onCreateButtonClick')
        expect(onCreateButtonClick).toBeInstanceOf(Function)
        onCreateButtonClick('aNewResource');
        // no test for actions triggered
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(store.getActions().length).toBe(0)

    });

    it('maps onRefreshButtonClick', () => {


        const initialState = {
            creator : {
                isFetching: false,
            },
            resources: {
                isFetching: false,
                needsRefresh: true,
                items: []
            }
        }

        const { enzymeWrapper, store, dispatch } = setup(initialState)

        const componentWrapper = enzymeWrapper.find(Activities)
        const onRefreshButtonClick = componentWrapper.prop('onRefreshButtonClick')
        expect(onRefreshButtonClick).toBeInstanceOf(Function)
        onRefreshButtonClick();
        // no test for actions triggered
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(store.getActions().length).toBe(0)

    });

});
