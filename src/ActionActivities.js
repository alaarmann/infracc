import { connect } from 'react-redux'
import { addResource } from './actions'
import Activities from './Activities'

const mapStateToProps = () => {return {};}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateButtonClick: (resourceName) => {
      dispatch(addResource(resourceName))
    }
  }
}

const ActionActivities = connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities)

export default ActionActivities
