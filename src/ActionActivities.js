import { connect } from 'react-redux'
import { addResource, fetchResourcesIfNeeded, CREATE_RESOURCE } from './actions'
import Activities from './Activities'

const mapStateToProps = (state) => {
    return {
        // TODO: map to pendingActions
        isCreateButtonDisabled : CREATE_RESOURCE in state.pendingActions,
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
            dispatch(fetchResourcesIfNeeded())
        }
    }
}

const ActionActivities = connect(
    mapStateToProps,
  mapDispatchToProps
)(Activities)

export default ActionActivities
