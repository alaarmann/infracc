import { connect } from 'react-redux'
import Messages from './Messages'

const mapStateToProps = (state) => {
    return {
        message: state.messages.errorMessage
    }
}

const MessagesContainer = connect(
  mapStateToProps
)(Messages)

export default MessagesContainer
