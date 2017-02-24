import {connect} from 'react-redux'
import {addResource, CREATE_RESOURCE, retrieveResources, closeComponent} from './actions'
import {RESOURCE_EDITOR} from './ResourceEditor'
import ResourceEditor from './ResourceEditor'

const mapStateToProps = (state) => {
    return {
        show: RESOURCE_EDITOR in state.openComponents,
        isPending: CREATE_RESOURCE in state.pendingActions,
        errorMessage: state.messages[CREATE_RESOURCE] && state.messages[CREATE_RESOURCE].errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(closeComponent({key : RESOURCE_EDITOR})),
        create: (resourceKey) => dispatch(addResource({'key' : resourceKey})).then(
            () => dispatch(closeComponent({key : RESOURCE_EDITOR}))
        ).then(
            () => dispatch(retrieveResources())
        ).catch(
            () => console.log("Error caught!")
        )
        // TODO: reconfirm when closing with unsaved changes
    }
}

const ResourceEditorConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceEditor)

export default ResourceEditorConnector
