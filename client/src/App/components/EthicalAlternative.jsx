import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class EthicalAlternative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueIngredient: this.props.issueIngredient.name,
            ethicalIssues: [],
            altIngredients: []
        }
    }

    render() {
        return(
            <Modal show={this.props.modalOpen} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Issues and Alternatives for {this.state.issueIngredient}</Modal.Title>
                </Modal.Header>
            </Modal>
        )
    }
}

export default EthicalAlternative;