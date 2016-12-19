import React from 'react';

export default ({resources, ...props}) => (
  <div className="Resources">
      <ul>
        {resources.map(resource => (
          <li key={resource._id}>{resource.key}</li>
        ))}
      </ul>
    </div>
)
