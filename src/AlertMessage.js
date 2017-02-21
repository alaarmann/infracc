import React from 'react';
import {Alert } from 'react-bootstrap'

export default ({message, type="danger", ...props}) => {

    if (typeof message === 'string') {
        return <Alert bsStyle={type}>
            {message}
        </Alert>
    } else {
        return null
    }
}
