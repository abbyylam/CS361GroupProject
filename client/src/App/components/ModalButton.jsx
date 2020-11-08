import { findProps } from 'devextreme-react/core/template'
import React from 'react'

const ModalButton = (props) => (
    <div>
        <button
            className="nav-link"
            onClick={props.openModal}
        >
            Login/SignUp
        </button>
    </div>
)

export default ModalButton