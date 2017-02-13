import {connect} from 'react-redux'
import {closeResourceEditor} from './actions'
import ResourceEditor from './ResourceEditor'

const mapStateToProps = (state) => {
    return {
        show: state.isResourceEditorOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(closeResourceEditor())
        // TODO: refresh overview after successful creation
    }
}

const ResourceEditorConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceEditor)

export default ResourceEditorConnector
