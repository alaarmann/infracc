import {connect} from 'react-redux'
import {closeResourceEditor, addResource, CREATE_RESOURCE, retrieveResources} from './actions'
import ResourceEditor from './ResourceEditor'

const mapStateToProps = (state) => {
    return {
        show: state.isResourceEditorOpen,
        isPending: CREATE_RESOURCE in state.pendingActions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(closeResourceEditor()),
        create: (resourceKey) => dispatch(addResource({'key' : resourceKey})).then(
            () => dispatch(closeResourceEditor())
        ).then(
            () => dispatch(retrieveResources())
        )
        // TODO: refresh overview after successful creation only
    }
}

const ResourceEditorConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceEditor)

export default ResourceEditorConnector
