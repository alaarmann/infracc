import { connect } from 'react-redux'
import { addResource, retrieveResources, CREATE_RESOURCE, RETRIEVE_RESOURCES } from './actions'
import Activities from './Activities'

const mapStateToProps = (state) => {
    return {
        isCreateButtonDisabled : CREATE_RESOURCE in state.pendingActions,
        isRefreshButtonDisabled : RETRIEVE_RESOURCES in state.pendingActions,
        lastUpdated : state.resources.lastUpdated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateButtonClick: (resourceKey) =>
            dispatch(addResource({'key' : resourceKey})).then(
                // TODO: avoid dispatch in error condition
                () => dispatch(retrieveResources())
            ),
        onRefreshButtonClick: () => dispatch(retrieveResources())
    }
}

const ActionActivities = connect(
    mapStateToProps,
  mapDispatchToProps
)(Activities)

export default ActionActivities
