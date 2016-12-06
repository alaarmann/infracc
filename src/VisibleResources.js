import { connect } from 'react-redux'
import Resources from './Resources'

const mapStateToProps = (state) => {
  return {
    resources: state.resources.filter( res => res.indexOf(state.filter) >= 0)
  }
}

const mapDispatchToProps = () => {return{};}

const VisibleResources = connect(
  mapStateToProps,
  mapDispatchToProps
)(Resources)

export default VisibleResources
