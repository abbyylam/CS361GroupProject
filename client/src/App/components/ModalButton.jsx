import { findProps } from 'devextreme-react/core/template'
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
        {/* <button
            className="btn btn-light"
            onClick={props.openModal}
        >
            Login/SignUp
        </button> */}
    </div>
)

export default ModalButton