import {connect} from 'react-redux'
import {retrieveResources, CREATE_RESOURCE, RETRIEVE_RESOURCES, openResourceEditor} from './actions'
import Activities from './Activities'

const mapStateToProps = (state) => {
    return {
        isCreateButtonDisabled: CREATE_RESOURCE in state.pendingActions,
        isRefreshButtonDisabled: RETRIEVE_RESOURCES in state.pendingActions,
        lastUpdated: state.resources.lastUpdated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateButtonClick: () => dispatch(openResourceEditor()),
        onRefreshButtonClick: () => dispatch(retrieveResources())
    }
}

const ActivitiesConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(Activities)

export default ActivitiesConnector
