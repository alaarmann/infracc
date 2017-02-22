import {connect} from 'react-redux'
import {CONFIRM_DIALOG} from './ConfirmDialog'
import ConfirmDialog from './ConfirmDialog'

const mapStateToProps = (state) => {
    return {
        show: CONFIRM_DIALOG in state.openComponents,
        ok: state.confirmCallbacks.resolve,
        cancel: state.confirmCallbacks.reject
        // TODO: pass description of activity to be confirmed
        //activity: state.openComponents[CONFIRM_DIALOG] && state.openComponents[CONFIRM_DIALOG].activity
    }
}

const ConfirmDialogConnector = connect(
    mapStateToProps
)(ConfirmDialog)

export default ConfirmDialogConnector
