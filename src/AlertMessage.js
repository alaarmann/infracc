import React from 'react';
import {Alert } from 'react-bootstrap'

export default ({message, ...props}) => {

    if (typeof message === 'string') {
        return <Alert bsStyle="danger">
            {message}
        </Alert>
    } else {
        return null
    }
}
