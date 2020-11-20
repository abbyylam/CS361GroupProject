import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class EthicalAlternative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueIngredient: this.props.issueIngredient.name,
            ethicalIssue: this.props.issueIngredient.ethicalIssues,
            altIngredients: this.props.issueIngredient.altIngredients
        }
    }

    componentDidMount() {
    };

    render() {
        let ingredient;

        if (this.state.issueIngredient) {
            ingredient = this.state.issueIngredient;
        }

        let issue, description, evidenceUrl;

        if (this.state.ethicalIssue) {
            issue = this.state.ethicalIssue.name;
            description = this.state.ethicalIssue.description;
            evidenceUrl = this.state.ethicalIssue.evidenceUrl;
        }

        return(
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.props.modalOpen} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Issues and Alternatives for {ingredient}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{ingredient} has issues regarding {issue}, including {description}.</p>
                    <p>See the evidence from <a href={evidenceUrl} target="_blank">this resource</a>.</p>
                    <hr/>
                    <p>Ethical Alternatives will go here.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" onClick={this.props.onClose}>Use this recipe as-is</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EthicalAlternative;