import { filter, resources, messages, pendingActions, openComponents } from './reducers'
import { FILTER_RESOURCES, RETRIEVE_RESOURCES, CREATE_RESOURCE, REGISTER_PENDING, DEREGISTER_PENDING, OPEN_COMPONENT, CLOSE_COMPONENT } from './actions'
import { RESOURCE_EDITOR } from './ResourceEditor'

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

    it('applies FILTER_RESOURCES with empty payload on previously modified state', () => {
        expect(
            filter('A previous expression', {
                type: FILTER_RESOURCES,
                payload: ''
            })
        ).toEqual('')
    })
})

describe('resources reducer', () => {
    it('returns the initial state', () => {
        expect(
            resources(undefined, {type : 'NO_DEFINED_ACTION'})
        ).toEqual({
            items: [],
            lastUpdated : null
        })
    })

    it('applies RETRIEVE_RESOURCES on initial state', () => {
        const receivedResources = [{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0},{"_id":"587fdfcb9a20f21027a5b970","key":"Another Resource","__v":0}]
        const receivedAt = new Date(2017, 1, 21, 22, 40, 52, 123)

        const resultState = resources(undefined, {
            type: RETRIEVE_RESOURCES,
            payload : {
                resources: receivedResources,
                receivedAt: receivedAt
            }
        })
        expect(resultState).toEqual({
            items: receivedResources,
            lastUpdated: receivedAt
        })
    })

    it('applies RETRIEVE_RESOURCES on previously modified state', () => {
        const receivedResources = [{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0},{"_id":"587fdfcb9a20f21027a5b970","key":"Another Resource","__v":0}]
        const receivedAt = new Date(2017, 1, 21, 22, 40, 52, 123)

        const resultState = resources({
            items: [{"_id":"587fdfbb9a20f21027a5b96f","key":"My latest Resource","__v":0}],
            lastUpdated: new Date(2017, 1, 1, 19, 4, 25, 321)
        }, {
            type: RETRIEVE_RESOURCES,
            payload : {
                resources: receivedResources,
                receivedAt: receivedAt
            }
        })
        expect(resultState).toEqual({
            items: receivedResources,
            lastUpdated: receivedAt
        })
    })

    // TODO: test error condition

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
        [CREATE_RESOURCE] : {errorMessage : anErrorMessage}
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
            [CREATE_RESOURCE] : {errorMessage : 'Any previous error'}
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
            [CREATE_RESOURCE] : {errorMessage : 'Any previous error'}
        }, {
            type: CREATE_RESOURCE,
            payload : {}
        })
        expect(resultState).toEqual({})
    })

    it('applies REGISTER_PENDING on previously modified state', () => {
        const resultState = messages({
            [CREATE_RESOURCE] : {errorMessage : 'Any previous error'}
        }, {
            type: REGISTER_PENDING,
            payload : CREATE_RESOURCE
        })
        expect(resultState).toEqual({})
    })

    it('applies CLOSE_COMPONENT [RESOURCE_EDITOR] on previously modified state', () => {
        const resultState = messages({
            [CREATE_RESOURCE] : {errorMessage : 'Any previous error'}
        }, {
            type: CLOSE_COMPONENT,
            payload : {key : RESOURCE_EDITOR}
        })
        expect(resultState).toEqual({})
    })
})

describe('openComponents reducer', () => {
    const A_COMPONENT = 'A_COMPONENT'

    it('applies OPEN_COMPONENT on initial state', () => {
        expect(
            openComponents(undefined, {
                type : OPEN_COMPONENT,
                payload : {key : A_COMPONENT}
            })
        ).toEqual({[A_COMPONENT]: {}})
    })

    it('applies OPEN_COMPONENT on previously modified state', () => {
        const resultState = openComponents({
            [A_COMPONENT] : {}
        }, {
            type: OPEN_COMPONENT,
            payload : {key : A_COMPONENT}
        })
        expect(resultState).toEqual({[A_COMPONENT]: {}})
    })

    it('applies CLOSE_COMPONENT on initial state', () => {
        expect(
            openComponents(undefined, {
                type : CLOSE_COMPONENT,
                payload : {key : A_COMPONENT}
            })
        ).toEqual({})
    })

    it('applies CLOSE_COMPONENT on previously modified state', () => {
        const resultState = openComponents({
            [A_COMPONENT] : {}
        }, {
            type: CLOSE_COMPONENT,
            payload : {key : A_COMPONENT}
        })
        expect(resultState).toEqual({})
    })
})
