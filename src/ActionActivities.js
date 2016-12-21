import { connect } from 'react-redux'
import { addResource, refreshResources, fetchResourcesIfNeeded } from './actions'
import Activities from './Activities'
import uuid from 'uuid'

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateButtonClick: (resourceKey) => {
            dispatch(addResource({_id: uuid.v4(), key: resourceKey}))
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
