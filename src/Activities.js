import React from 'react';

export default ({onCreateButtonClick, onRefreshButtonClick, isCreateButtonDisabled, isRefreshButtonDisabled })=> {
  var newResourceNameInput = null;

  return <div className="Activities">
    <input
      type="text"
      ref={(input) => { newResourceNameInput = input; }} />

    <button onClick={e => {
         e.preventDefault()
         onCreateButtonClick(newResourceNameInput.value)
       }} disabled={isCreateButtonDisabled}>+</button>
      <button onClick={e => {
          e.preventDefault()
          onRefreshButtonClick()
      }} disabled={isRefreshButtonDisabled}>Refresh</button>
  </div>
}
