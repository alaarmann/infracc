import React from 'react';

export default ({onFilterChange})=> (
  <div className="Filter">
    <input onChange={e => {
         e.preventDefault()
         onFilterChange(e.target.value)
       }}/> 
  </div>
)
