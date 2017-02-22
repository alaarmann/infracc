import {connect} from 'react-redux'
import Resources from './Resources'
import {RETRIEVE_RESOURCES, deleteResource, retrieveResources, confirmActivity, closeComponent} from './actions'
import {CONFIRM_DIALOG} from './ConfirmDialog'

const mapStateToProps = (state) => {
    return {
        resources: state.resources.items.filter(res => res.key.indexOf(state.filter) >= 0),
        isFetching: RETRIEVE_RESOURCES in state.pendingActions,
        lastUpdated: state.resources.lastUpdated,
        isDeleteButtonDisabled: RETRIEVE_RESOURCES in state.pendingActions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteButtonClick: (resource) => dispatch(confirmActivity())
            .then(
                // TODO: extract to (future) action chain
                () => dispatch(closeComponent(CONFIRM_DIALOG))
            ).then(
                () => dispatch(deleteResource(resource))
            ).then(
                () => dispatch(retrieveResources())
            ).catch(
                () => {
                    console.log("Error or Cancel caught!")
                    // TODO: extract to action chain
                    dispatch(closeComponent(CONFIRM_DIALOG))
                }
            )
    }
}

const VisibleResources = connect(
    mapStateToProps,
    mapDispatchToProps
)(Resources)

export default VisibleResources
