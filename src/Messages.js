import React from 'react';

export default ({message, ...props}) => (
  <div className="Messages" hidden={message === null}>
      <span>
          {message}
      </span>
    </div>
)
