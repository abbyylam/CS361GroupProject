import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {FetchIngredientIssue, FetchIngredientAlternatives} from '../requests/Api';
import Ingredient from './Ingredient';

class EthicalAlternative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueIngredient: this.props.issueIngredient,
            ethicalIssue: null,
            altIngredients: null
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

        FetchIngredientAlternatives(ingredientId)
        .then(res => {
            return res.json();
        })
        .then(altIngredients => {
            if (altIngredients.success == true) {
                this.setState({ altIngredients: altIngredients.data });
            }
        });
    }

    render() {
        let modal;

        if (this.state.ethicalIssue == null && this.state.altIngredients == null) {
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

            let alternatives = [];
            if (this.state.altIngredients) {
                for (let i = 0; i < this.state.altIngredients.length; i++) {
                    alternatives.push(<Ingredient ingredient={this.state.altIngredients[i]} key={i} asAlternative={true} onSwap={this.props.onSwap} />);
                }
            } else {
                alternatives.push(<div className="col-12">No alternatives found</div>);
            }

            modal = <div>
                        <Modal.Header closeButton>
                            <Modal.Title>Issues and Alternatives for <span className="capitalize">{ingredient}</span></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><span className="capitalize">{ingredient}</span> has issues regarding {issue}, including {description}.</p>
                            <p>See the evidence from <a href={evidenceUrl} target="_blank">this resource</a>.</p>
                            <hr/>
                            <div className="row">{alternatives}</div>
                        </Modal.Body>
                        <Modal.Footer>
                            {this.props.hasSwapped && <Button variant="secondary" onClick={this.props.doRevert}>Revert to original ingredient</Button>}
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