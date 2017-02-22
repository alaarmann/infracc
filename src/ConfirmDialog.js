import React from 'react';
import { Modal, Button} from 'react-bootstrap'

export const CONFIRM_DIALOG = 'CONFIRM_DIALOG'

export default ({show, activity, ok, cancel, ...props}) => {

    return <div className="ConfirmDialog">
        <Modal show={show}>
            <Modal.Header closeButton={false}>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Do you really want to execute ${activity}`}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={e => {
                    e.preventDefault()
                    console.log('ok=', ok)
                    ok()
                }}>OK</Button>
                <Button onClick={e => {
                    e.preventDefault()
                    cancel()
                }}>Cancel</Button>
            </Modal.Footer>
        </Modal>

    </div>
}
