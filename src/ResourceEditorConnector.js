import {connect} from 'react-redux'
import {closeResourceEditor, addResource, CREATE_RESOURCE, retrieveResources} from './actions'
import ResourceEditor from './ResourceEditor'

const mapStateToProps = (state) => {
    return {
        show: state.isResourceEditorOpen,
        isPending: CREATE_RESOURCE in state.pendingActions,
        errorMessage: state.messages[CREATE_RESOURCE] && state.messages[CREATE_RESOURCE].errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(closeResourceEditor()),
        create: (resourceKey) => dispatch(addResource({'key' : resourceKey})).then(
            () => dispatch(closeResourceEditor())
        ).then(
            () => dispatch(retrieveResources())
        ).catch(
            () => console.log("Error caught!")
        )
        // TODO: clear error messages on close
        // TODO: reconfirm when closing with unsaved changes
    }
}

const ResourceEditorConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceEditor)

export default ResourceEditorConnector
