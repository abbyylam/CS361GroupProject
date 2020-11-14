import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class EthicalAlternative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueIngredient: this.props.issueIngredient.name,
            ethicalIssues: '',
            altIngredients: []
        }
    }

    componentDidMount() {
        let issueArr = this.props.issueIngredient.ethicalIssues;
        let issues = '';
            for (let i = 0; i < issueArr.length; i++) {
                if (issueArr.length > 1) {
                    if (i == issueArr.length - 1) {
                        issues = issues + ' and ';
                    } else {
                        isses = issues + ', '
                    }
                }

                issues = issues + issueArr[i].name
            }
        this.setState({ethicalIssues: issues});
    };

    render() {

        return(
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.props.modalOpen} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Issues and Alternatives for {this.state.issueIngredient}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.state.issueIngredient} has issues regarding {this.state.ethicalIssues}.</p>
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