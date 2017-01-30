import { connect } from 'react-redux'
import { addResource, refreshResources, fetchResourcesIfNeeded } from './actions'
import Activities from './Activities'

const mapStateToProps = (state) => {
    return {
        // TODO: map to pendingActions
        isCreateButtonDisabled : state.creator.isFetching,
        isRefreshButtonDisabled : state.resources.isFetching,
        lastUpdated : state.resources.lastUpdated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateButtonClick: (resourceKey) => {
            dispatch(addResource({'key' : resourceKey}))
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
