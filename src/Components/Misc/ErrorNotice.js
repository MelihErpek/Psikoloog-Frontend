import React from "react";
import {Alert} from 'react-bootstrap';
export default function ErrorNotice(props) {
    return (
        <div >
            
                <Alert  variant="danger" onClose={props.clearError} dismissible>
                    {props.message}
                </Alert>
            

        </div>
    );
}