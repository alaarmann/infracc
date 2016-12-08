import React from 'react';

export default ({onCreateButtonClick})=> {
  var newResourceNameInput = null;

  return <div className="Activities">
    <input
      type="text"
      ref={(input) => { newResourceNameInput = input; }} />

    <button onClick={e => {
         e.preventDefault()
         onCreateButtonClick(newResourceNameInput.value)
       }}>+</button> 
  </div>
}
