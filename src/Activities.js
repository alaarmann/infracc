import React from 'react'
import { ButtonToolbar, Button, Glyphicon} from 'react-bootstrap'


export default ({onCreateButtonClick, onRefreshButtonClick, isCreateButtonDisabled, isRefreshButtonDisabled })=> {
  return <ButtonToolbar>
          <Button onClick={e => {
              e.preventDefault()
              onCreateButtonClick()
          }} disabled={isCreateButtonDisabled}><Glyphicon glyph="plus" /></Button>
          <Button onClick={e => {
              e.preventDefault()
              onRefreshButtonClick()
          }} disabled={isRefreshButtonDisabled}><Glyphicon glyph="refresh" /></Button>
      </ButtonToolbar>
}
