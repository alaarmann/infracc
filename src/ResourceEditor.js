import React from 'react';
import { Modal, Button } from 'react-bootstrap'

export default ({show, close, ...props}) => (
    <div className="ResourceEditor">
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Resource Editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>The resource editor</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>Cancel</Button>
            </Modal.Footer>
        </Modal>

    </div>
)
