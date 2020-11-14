import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class EthicalAlternative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueIngredient: '',
            ethicalIssues: [],
            altIngredients: []
        }
    }

    render() {
        return(
            <Modal show={this.props.modalOpen} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    
                </Modal.Header>
            </Modal>
        )
    }
}

export default EthicalAlternative;