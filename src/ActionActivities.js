import { connect } from 'react-redux'
import { addResource, refreshResources, fetchResourcesIfNeeded } from './actions'
import Activities from './Activities'

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
  null,
  mapDispatchToProps
)(Activities)

export default ActionActivities
