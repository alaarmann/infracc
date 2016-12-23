import { connect } from 'react-redux'
import { addResource, refreshResources, fetchResourcesIfNeeded } from './actions'
import Activities from './Activities'

const mapStateToProps = (state) => {
    return {
        isCreateFetching : state.creator.isFetching,
        isResourcesFetching : state.resources.isFetching,
        lastUpdated : state.resources.lastUpdated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateButtonClick: (resourceKey) => {
            dispatch(addResource({'key' : resourceKey}))
            dispatch(refreshResources())
            dispatch(fetchResourcesIfNeeded())
        },
        onRefreshButtonClick: () => {
            dispatch(refreshResources())
            dispatch(fetchResourcesIfNeeded())
        }
    }
}

const ActionActivities = connect(
    mapStateToProps,
  mapDispatchToProps
)(Activities)

export default ActionActivities
