import {connect} from 'react-redux'
import {CONFIRM_DIALOG} from './ConfirmDialog'
import ConfirmDialog from './ConfirmDialog'

const mapStateToProps = (state) => {
    return {
        show: CONFIRM_DIALOG in state.openComponents,
        ok: state.openComponents[CONFIRM_DIALOG] && state.openComponents[CONFIRM_DIALOG].resolve,
        cancel: state.openComponents[CONFIRM_DIALOG] && state.openComponents[CONFIRM_DIALOG].reject,
        activity: state.openComponents[CONFIRM_DIALOG] && state.openComponents[CONFIRM_DIALOG].activity
    }
}

const ConfirmDialogConnector = connect(
    mapStateToProps
)(ConfirmDialog)

export default ConfirmDialogConnector
