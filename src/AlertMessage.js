import React from 'react';
import {Alert } from 'react-bootstrap'

export default ({message, style="danger", ...props}) => {

    if (typeof message === 'string') {
        return <Alert bsStyle={style}>
            {message}
        </Alert>
    } else {
        return null
    }
}
