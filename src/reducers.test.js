import { filter, resources, creator, messages } from './reducers'
import { FILTER_RESOURCES, REFRESH_RESOURCES, REQUEST_RESOURCES, RECEIVE_RESOURCES, ERROR_RESOURCES, REQUEST_CREATE_RESOURCE, RECEIVE_CREATE_RESOURCE, ERROR_CREATE_RESOURCE } from './actions'

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

    it('applies RECEIVE_CREATE_RESOURCE on initial state', () => {
        const {needsRefresh} = resources(undefined, {
            type: RECEIVE_CREATE_RESOURCE
        })
        expect(needsRefresh).toBe(true)
    })

    it('applies RECEIVE_CREATE_RESOURCE on previously modified state', () => {
        const {needsRefresh} = resources({
            isFetching: true,
            needsRefresh: false,
            items: []
        }, {
            type: RECEIVE_CREATE_RESOURCE
        })
        expect(needsRefresh).toBe(true)
    })

})

describe('creator reducer', () => {
    it('returns the initial state', () => {
        expect(
            creator(undefined, {})
        ).toEqual({
            isFetching: false
        })
    })

    it('applies REQUEST_CREATE_RESOURCE on initial state', () => {
        const resultState = creator(undefined, {
            type: REQUEST_CREATE_RESOURCE
        })
        expect(resultState).toEqual({
            isFetching: true
        })
    })

    it('applies REQUEST_CREATE_RESOURCE on previously modified state', () => {
        const resultState = creator({
            isFetching: true
        }, {
            type: REQUEST_CREATE_RESOURCE
        })
        expect(resultState).toEqual({
            isFetching: true
        })
    })

    it('applies RECEIVE_CREATE_RESOURCE on initial state', () => {
        const resultState = creator(undefined, {
            type: RECEIVE_CREATE_RESOURCE
        })
        expect(resultState).toEqual({
            isFetching: false
        })
    })

    it('applies RECEIVE_CREATE_RESOURCE on previously modified state', () => {
        const resultState = creator({
            isFetching: true
        }, {
            type: RECEIVE_CREATE_RESOURCE
        })
        expect(resultState).toEqual({
            isFetching: false
        })
    })

    it('applies ERROR_CREATE_RESOURCE on initial state', () => {
        const resultState = creator(undefined, {
            type: ERROR_CREATE_RESOURCE
        })
        expect(resultState).toEqual({
            isFetching: false
        })
    })

    it('applies ERROR_CREATE_RESOURCE on previously modified state', () => {
        const resultState = creator({
            isFetching: true
        }, {
            type: ERROR_CREATE_RESOURCE
        })
        expect(resultState).toEqual({
            isFetching: false
        })
    })

})

describe('messages reducer', () => {
    it('returns the initial state', () => {
        expect(
            messages(undefined, {})
        ).toEqual({
            errorMessage: null
        })
    })

    it('applies ERROR_CREATE_RESOURCE on initial state', () => {
        const resultState = messages(undefined, {
            type: ERROR_CREATE_RESOURCE,
            errorMessage : 'An error message'
        })
        expect(resultState).toEqual({
            errorMessage : 'An error message'
        })
    })

    it('applies ERROR_CREATE_RESOURCE on previously modified state', () => {
        const resultState = messages({
            errorMessage : 'A previous error message'
        }, {
            type: ERROR_CREATE_RESOURCE,
            errorMessage : 'An error message'
        })
        expect(resultState).toEqual({
            errorMessage : 'An error message'
        })
    })

    it('applies ERROR_RESOURCES on initial state', () => {
        const resultState = messages(undefined, {
            type: ERROR_RESOURCES,
            errorMessage : 'An error message'
        })
        expect(resultState).toEqual({
            errorMessage : 'An error message'
        })
    })

    it('applies ERROR_RESOURCES on previously modified state', () => {
        const resultState = messages({
            errorMessage : 'A previous error message'
        }, {
            type: ERROR_RESOURCES,
            errorMessage : 'An error message'
        })
        expect(resultState).toEqual({
            errorMessage : 'An error message'
        })
    })
})
