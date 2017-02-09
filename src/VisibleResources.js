import { connect } from 'react-redux'
import Resources from './Resources'
import {RETRIEVE_RESOURCES} from './actions'

const mapStateToProps = (state) => {
    return {
        resources: state.resources.items.filter(res => res.key.indexOf(state.filter) >= 0),
        isFetching : RETRIEVE_RESOURCES in state.pendingActions,
        lastUpdated : state.resources.lastUpdated
    }
}

const VisibleResources = connect(
  mapStateToProps
)(Resources)

export default VisibleResources
