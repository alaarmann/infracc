import { connect } from 'react-redux'
import Messages from './Messages'

const mapStateToProps = (state) => {
    return {
        message : Object.keys(state.messages).reduce((message, key) => {
        const errorMessage =  state.messages[key].errorMessage
        return `${message.length > 0 ? message + ' ' : ''}${errorMessage}`
    }, '')
    }
}

const MessagesConnector = connect(
  mapStateToProps
)(Messages)

export default MessagesConnector
