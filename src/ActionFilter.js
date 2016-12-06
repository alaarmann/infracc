import { connect } from 'react-redux'
import { filterResources } from './actions'
import Filter from './Filter'

const mapStateToProps = () => {return {};}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterChange: (filter) => {
      dispatch(filterResources(filter))
    }
  }
}

const ActionFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ActionFilter
