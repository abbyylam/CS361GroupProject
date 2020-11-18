import React from 'react'

import { Button } from 'react-bootstrap'

const ModalButton = (props) => (
    <div>
        <Button
            variant="outline-light"
            onClick={props.openModal}
        >
            Login/SignUp
        </Button>
    </div>
)

export default ModalButton