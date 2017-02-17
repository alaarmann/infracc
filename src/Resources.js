import React from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap'
import AlertMessage from './AlertMessage'

export default ({resources, isFetching, lastUpdated, ...props}) => (
  <div className="Resources" style={{ opacity: isFetching ? 0.5 : 1 }}>
      <AlertMessage style="info" message={lastUpdated && `Last updated at ${new Date(lastUpdated).toLocaleTimeString()}`} />
      <ListGroup>
        {resources.map(resource => (
          <ListGroupItem key={resource._id}>{resource.key}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
)
