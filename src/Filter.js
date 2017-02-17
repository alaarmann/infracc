import React from 'react';
import { FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

export default ({onFilterChange}) => (<FormGroup controlId="filter">
        <ControlLabel>Filter</ControlLabel>
        <FormControl
        type="text"
        placeholder="Enter filter"
        onChange={e => {
            e.preventDefault()
            onFilterChange(e.target.value)
        }}/>
        </FormGroup>)

