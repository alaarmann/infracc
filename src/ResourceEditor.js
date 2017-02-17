import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import AlertMessage from './AlertMessage'

export const RESOURCE_EDITOR = 'RESOURCE_EDITOR'

export default ({show, create, close, isPending, errorMessage, ...props}) => {
    var newResourceNameInput = null

    return <div className="ResourceEditor">
        <Modal show={show}>
            <Modal.Header closeButton={false}>
                <Modal.Title>Resource Editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlertMessage message={errorMessage}/>
                <FormGroup controlId="resourceName">
                    <ControlLabel>Resource name</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter resource name"
                        disabled={isPending}
                        inputRef={input => {
                            newResourceNameInput = input;
                        }}/>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={e => {
                    e.preventDefault()
                    create(newResourceNameInput.value)
                }}
                disabled={isPending}>Create</Button>
                <Button onClick={close} disabled={isPending}>Cancel</Button>
            </Modal.Footer>
        </Modal>

    </div>
}
