import { connect } from 'react-redux'
import { closeResourcEditor } from './actions'
import ResourceEditor from './ResourceEditor'

const mapStateToProps = (state) => {
    return {
        show : state.isResourceEditorOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(closeResourcEditor())
    }
}

const ResourceEditorConnector = connect(
    mapStateToProps,
  mapDispatchToProps
)(ResourceEditor)

export default ResourceEditorConnector
