import React from 'react';

export default ({onCreateButtonClick})=> (
  <div className="Activities">
    <button onClick={e => {
         e.preventDefault()
         onCreateButtonClick("New Resource")
       }}>+</button> 
  </div>
)
