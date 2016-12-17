import { connect } from 'react-redux'
import { filterResources } from './actions'
import Filter from './Filter'

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterChange: (filter) => {
      dispatch(filterResources(filter))
    }
  }
}

const ActionFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ActionFilter
