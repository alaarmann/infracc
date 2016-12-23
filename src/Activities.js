import React from 'react';

export default ({onCreateButtonClick, onRefreshButtonClick, isCreateFetching, isResourcesFetching })=> {
  var newResourceNameInput = null;

  return <div className="Activities">
    <input
      type="text"
      ref={(input) => { newResourceNameInput = input; }} />

    <button onClick={e => {
         e.preventDefault()
         onCreateButtonClick(newResourceNameInput.value)
       }} disabled={isCreateFetching}>+</button>
      <button onClick={e => {
          e.preventDefault()
          onRefreshButtonClick()
      }} disabled={isResourcesFetching}>Refresh</button>
  </div>
}
