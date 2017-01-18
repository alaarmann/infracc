import * as actions from './actions'

describe('filterResources', () => {
    it('should create an action to filter resources', () => {
        const filterExpression = 'anExpression'
        const expectedAction = {
            type: actions.FILTER_RESOURCES,
            filterExpression
        }
        expect(actions.filterResources(filterExpression)).toEqual(expectedAction)
    })
})

