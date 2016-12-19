import { connect } from 'react-redux'
import Resources from './Resources'

const mapStateToProps = (state) => {
  return {
    resources: state.resources.filter( res => res.key.indexOf(state.filter) >= 0)
  }
}

const VisibleResources = connect(
  mapStateToProps
)(Resources)

export default VisibleResources
