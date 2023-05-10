import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from "react-bootstrap";

const Notification = (props) =>  {
    return (
        <Alert style={{whiteSpace: "pre-wrap"}} className="text-left" hidden={props.hidden} variant={props.type}>{props.message}</Alert>
    )
}

Notification.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    hidden: PropTypes.bool,
}

Notification.defaultProps = {
    type: "success",
    message: "default message",
    hidden: false
}

export default Notification;