import React from 'react';

export default ({resources, isFetching, lastUpdated, ...props}) => (
  <div className="Resources" style={{ opacity: isFetching ? 0.5 : 1 }}>
      {lastUpdated &&
      <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}
      </span>
      }

      <ul>
        {resources.map(resource => (
          <li key={resource._id}>{resource.key}</li>
        ))}
      </ul>
    </div>
)
