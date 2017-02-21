import React from 'react';
import { ListGroup, ListGroupItem, Button, Glyphicon, Grid, Row, Col, Label} from 'react-bootstrap'
import AlertMessage from './AlertMessage'

export default ({resources, isFetching, lastUpdated, onDeleteButtonClick, isDeleteButtonDisabled, ...props}) => (
  <div className="Resources" style={{ opacity: isFetching ? 0.5 : 1 }}>
      <AlertMessage type="info" message={lastUpdated && `Last updated at ${new Date(lastUpdated).toLocaleTimeString()}`} />
      <ListGroup>
        {resources.map(resource => (
          <ListGroupItem key={resource._id}>
              <Grid>
                  <Row className="show-grid">
                      <Col md={7}>
                          <h4>
                              <Label bsStyle="primary">{resource.key}</Label>
                          </h4>
                      </Col>
                      <Col>
                          <Button onClick={e => {
                          e.preventDefault()
                          onDeleteButtonClick(resource)
                      }} disabled={isDeleteButtonDisabled}><Glyphicon glyph="remove" /></Button>
                      </Col>
                  </Row>
              </Grid>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
)
