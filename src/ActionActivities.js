import { connect } from 'react-redux'
import { addResource } from './actions'
import Activities from './Activities'

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateButtonClick: (resourceName) => {
      dispatch(addResource(resourceName))
    }
  }
}

const ActionActivities = connect(
  null,
  mapDispatchToProps
)(Activities)

export default ActionActivities
