import React from 'react';
import { ListGroup, ListGroupItem, Button, Glyphicon} from 'react-bootstrap'
import AlertMessage from './AlertMessage'

export default ({resources, isFetching, lastUpdated, onDeleteButtonClick, isDeleteButtonDisabled, ...props}) => (
  <div className="Resources" style={{ opacity: isFetching ? 0.5 : 1 }}>
      <AlertMessage type="info" message={lastUpdated && `Last updated at ${new Date(lastUpdated).toLocaleTimeString()}`} />
      <ListGroup>
        {resources.map(resource => (
          <ListGroupItem key={resource._id}>{resource.key}
              <Button onClick={e => {
                  e.preventDefault()
                  onDeleteButtonClick(resource)
              }} disabled={isDeleteButtonDisabled}><Glyphicon glyph="remove" /></Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
)
