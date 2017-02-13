import React from 'react';
import { Modal, Button } from 'react-bootstrap'

export default ({show, create, close, isPending, ...props}) => {
    var newResourceNameInput = null

    return <div className="ResourceEditor">
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton={false}>
                <Modal.Title>Resource Editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="resourceName">Resource name</label>
                <input
                    id="resourceName"
                    type="text"
                    disabled={isPending}
                    ref={(input) => {
                        newResourceNameInput = input;
                    }}/>
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
