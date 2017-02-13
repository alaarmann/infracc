import React from 'react';

export default ({onCreateButtonClick, onRefreshButtonClick, isCreateButtonDisabled, isRefreshButtonDisabled })=> {
  return <div className="Activities">
    <button onClick={e => {
         e.preventDefault()
         onCreateButtonClick()
       }} disabled={isCreateButtonDisabled}>+</button>
      <button onClick={e => {
          e.preventDefault()
          onRefreshButtonClick()
      }} disabled={isRefreshButtonDisabled}>Refresh</button>
  </div>
}
