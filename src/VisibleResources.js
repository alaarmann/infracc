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
                () => dispatch(deleteResource(resource))
            ).then(
                () => dispatch(retrieveResources())
            ).catch(
                (error) => {
                    console.log("Error or Cancel caught!", error)
                }
            )
    }
}

const VisibleResources = connect(
    mapStateToProps,
    mapDispatchToProps
)(Resources)

export default VisibleResources
