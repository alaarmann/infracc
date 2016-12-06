import React from 'react';

export default ({resources, ...props}) => (
  <div className="Resources">
      <ul>
        {resources.map(resource => (
          <li>{resource}</li>
        ))}
      </ul>
    </div>
)
