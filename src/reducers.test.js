import { filter, resources, creator, messages, pendingActions } from './reducers'
import { FILTER_RESOURCES, REFRESH_RESOURCES, REQUEST_RESOURCES, RECEIVE_RESOURCES, ERROR_RESOURCES, CREATE_RESOURCE, REGISTER_PENDING, DEREGISTER_PENDING } from './actions'

describe('filter reducer', () => {
    it('returns the initial state', () => {
        expect(
            filter(undefined, {type : FILTER_RESOURCES, payload : undefined})
        ).toEqual('')
    })

    it('applies FILTER_RESOURCES on initial state', () => {
        expect(
            filter(undefined, {
                type: FILTER_RESOURCES,
                payload: 'A filter expression'
            })
        ).toEqual('A filter expression')
    })

    it('applies FILTER_RESOURCES on previously modified state', () => {
        expect(
            filter('A previous expression', {
                type: FILTER_RESOURCES,
                payload: 'A filter expression'
            })
        ).toEqual('A filter expression')
    })
})

describe('resources reducer', () => {
    it('returns the initial state', () => {
        expect(
            resources(undefined, {})
        ).toEqual({
            isFetching: false,
            needsRefresh: true,
            items: []
        })
    })

    it('applies REFRESH_RESOURCES on initial state', () => {
        const { needsRefresh} = resources(undefined, {
            type: REFRESH_RESOURCES
        })
        expect(needsRefresh).toBe(true)
    })

    it('applies REFRESH_RESOURCES on previously modified state', () => {
        const { needsRefresh} = resources({
            isFetching: false,
            needsRefresh: false,
            items: []
        }, {
            type: REFRESH_RESOURCES
        })
        expect(needsRefresh).toBe(true)
    })

    it('applies REQUEST_RESOURCES on initial state', () => {
        const { isFetching, needsRefresh} = resources(undefined, {
            type: REQUEST_RESOURCES
        })
        expect({
            isFetching,
            needsRefresh
        }).toEqual({
            isFetching : true,
            needsRefresh : false
        })
    })

    it('applies REQUEST_RESOURCES on previously modified state', () => {
        const { isFetching, needsRefresh} = resources({
            isFetching: true,
            needsRefresh: false,
            items: []
        }, {
            type: REQUEST_RESOURCES
        })
        expect({
            isFetching,
            needsRefresh
        }).toEqual({
            isFetching : true,
            needsRefresh : false
        })
    })

    it('applies RECEIVE_RESOURCES on initial state', () => {
        const receivedResources = [{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0},{"_id":"587fdfcb9a20f21027a5b970","key":"Another Resource","__v":0}]
        const receivedAt = new Date(2017, 1, 21, 22, 40, 52, 123)

        const resultState = resources(undefined, {
            type: RECEIVE_RESOURCES,
            resources : receivedResources,
            receivedAt : receivedAt
        })
        expect(resultState).toEqual({
            isFetching: false,
            needsRefresh: false,
            items: receivedResources,
            lastUpdated: receivedAt
        })
    })

    it('applies RECEIVE_RESOURCES on previously modified state', () => {
        const receivedResources = [{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0},{"_id":"587fdfcb9a20f21027a5b970","key":"Another Resource","__v":0}]
        const receivedAt = new Date(2017, 1, 21, 22, 40, 52, 123)

        const resultState = resources({
            isFetching: false,
            needsRefresh: false,
            items: [{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0}],
            lastUpdated: new Date(2017, 1, 1, 19, 4, 25, 321)
        }, {
            type: RECEIVE_RESOURCES,
            resources : receivedResources,
            receivedAt : receivedAt
        })
        expect(resultState).toEqual({
            isFetching: false,
            needsRefresh: false,
            items: receivedResources,
            lastUpdated: receivedAt
        })
    })

    it('applies ERROR_RESOURCES on initial state', () => {
        const { isFetching, needsRefresh} = resources(undefined, {
            type: ERROR_RESOURCES
        })
        expect({
            isFetching,
            needsRefresh
        }).toEqual({
            isFetching : false,
            needsRefresh : false
        })
    })

    it('applies ERROR_RESOURCES on previously modified state', () => {
        const { isFetching, needsRefresh} = resources({
            isFetching: true,
            needsRefresh: false,
            items: []
        }, {
            type: ERROR_RESOURCES
        })
        expect({
            isFetching,
            needsRefresh
        }).toEqual({
            isFetching : false,
            needsRefresh : false
        })
    })

})

describe('pendingActions reducer', () => {
    it('applies DEREGISTER_PENDING on previously modified state', () => {
        const resultState = pendingActions({
            CREATE_RESOURCE : {}
    }, {
            type: DEREGISTER_PENDING,
            payload : CREATE_RESOURCE
        })
        expect(resultState).toEqual({})
    })

    it('applies REGISTER_PENDING on initial state', () => {
        expect(
            pendingActions(undefined, {
                type : REGISTER_PENDING,
                payload : CREATE_RESOURCE})
        ).toEqual({CREATE_RESOURCE : {}})
    })
})

describe('messages reducer', () => {
    const anErrorMessage = 'An error has occurred!'
    const expectedFailureState = {
        CREATE_RESOURCE : {errorMessage : anErrorMessage}
    }
    it('applies CREATE_RESOURCE (failure) on initial state', () => {
        expect(
            messages(undefined, {
                type : CREATE_RESOURCE,
                payload : new Error(anErrorMessage),
                error : true
            })
        ).toEqual(expectedFailureState)
    })

    it('applies CREATE_RESOURCE (failure) on previously modified state', () => {
        const resultState = messages({
            CREATE_RESOURCE : {errorMessage : 'Any previous error'}
        }, {
            type: CREATE_RESOURCE,
            payload : new Error(anErrorMessage),
            error : true
        })
        expect(resultState).toEqual(expectedFailureState)
    })

    it('applies CREATE_RESOURCE (success) on initial state', () => {
        expect(
            messages(undefined, {
                type : CREATE_RESOURCE,
                payload : {}
            })
        ).toEqual({})
    })

    it('applies CREATE_RESOURCE (success) on previously modified state', () => {
        const resultState = messages({
            CREATE_RESOURCE : {errorMessage : 'Any previous error'}
        }, {
            type: CREATE_RESOURCE,
            payload : {}
        })
        expect(resultState).toEqual({})
    })

})
