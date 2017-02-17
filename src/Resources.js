import React from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap'

export default ({resources, isFetching, lastUpdated, ...props}) => (
  <div className="Resources" style={{ opacity: isFetching ? 0.5 : 1 }}>
      {lastUpdated &&
      <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}
      </span>
      }

      <ListGroup>
        {resources.map(resource => (
          <ListGroupItem key={resource._id}>{resource.key}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
)
