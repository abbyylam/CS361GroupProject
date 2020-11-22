import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {FetchIngredientIssue} from '../requests/Api';

class EthicalAlternative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueIngredient: this.props.issueIngredient,
            ethicalIssue: null,
            altIngredients: this.props.issueIngredient.altIngredients
        }
    }

    componentDidMount() {
        let ingredientId = this.state.issueIngredient.id;

        FetchIngredientIssue(ingredientId)
        .then(res => {
            return res.json();
        })
        .then(ethicalIssue => {
            this.setState({ ethicalIssue: ethicalIssue.data });
        });
    }

    render() {
        let modal;

        if (this.state.ethicalIssue == null) {
            modal = <Modal.Body>
                            Loading...
                        </Modal.Body>
        } else {
            let ingredient;

            if (this.state.issueIngredient) {
                ingredient = this.state.issueIngredient.Name;
            }

            let issue, description, evidenceUrl;

            if (this.state.ethicalIssue) {
                issue = this.state.ethicalIssue.Name;
                description = this.state.ethicalIssue.Description;
                evidenceUrl = this.state.ethicalIssue.EvidenceUrl;
            }

            modal = <div>
                        <Modal.Header closeButton>
                            <Modal.Title>Issues and Alternatives for <span className="capitalize">{ingredient}</span></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><span className="capitalize">{ingredient}</span> has issues regarding {issue}, including {description}.</p>
                            <p>See the evidence from <a href={evidenceUrl} target="_blank">this resource</a>.</p>
                            <hr/>
                            <p>Ethical Alternatives will go here.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="link" onClick={this.props.onClose}>Use this recipe as-is</Button>
                        </Modal.Footer>
                    </div>;
        }

        return(
            <Modal className="EthicalAlternative" size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.props.modalOpen} onHide={this.props.onClose}>
                {modal}
            </Modal>
        )
    }
}

export default EthicalAlternative;