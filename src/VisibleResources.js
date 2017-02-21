import {connect} from 'react-redux'
import Resources from './Resources'
import {RETRIEVE_RESOURCES, deleteResource, retrieveResources} from './actions'

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
        onDeleteButtonClick: (resource) => dispatch(deleteResource(resource))
            .then(
                () => dispatch(retrieveResources())
            ).catch(
                () => console.log("Error caught!")
            )
    }
}

const VisibleResources = connect(
    mapStateToProps,
    mapDispatchToProps
)(Resources)

export default VisibleResources
