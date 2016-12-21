import { connect } from 'react-redux'
import Resources from './Resources'

const mapStateToProps = (state) => {
    return {
        resources: state.resources.items.filter(res => res.key.indexOf(state.filter) >= 0),
        isFetching : state.resources.isFetching,
        lastUpdated : state.resources.lastUpdated
    }
}

const VisibleResources = connect(
  mapStateToProps
)(Resources)

export default VisibleResources
