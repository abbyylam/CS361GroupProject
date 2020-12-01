import React from 'react'

import { Button } from 'react-bootstrap'

function ModalButton(props) {
    return (
        <div>
        {props.isModal ? 
            <div
                className="nav-link"
                onClick={props.openModal}
            >
                My Recipe Book
            </div> 
        :
        
            <Button
                variant="outline-light"
                onClick={props.openModal}
            >
                Login/SignUp
            </Button>
        }
        </div>
    )
}

export default ModalButton