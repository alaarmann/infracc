import React from 'react';

export default ({onCreateButtonClick, onRefreshButtonClick})=> {
  var newResourceNameInput = null;

  return <div className="Activities">
    <input
      type="text"
      ref={(input) => { newResourceNameInput = input; }} />

    <button onClick={e => {
         e.preventDefault()
         onCreateButtonClick(newResourceNameInput.value)
       }}>+</button>
      <button onClick={e => {
          e.preventDefault()
          onRefreshButtonClick()
      }}>Refresh</button>
  </div>
}
