import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import EthicalAlternative from './EthicalAlternative';

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: this.props.ingredient,
            hasIssue: this.props.ingredient.HasIssue,
            modalOpen: false,
            initialIngredient: null,
            hasSwapped: false
        }
        this.setIssueIngredient = this.setIssueIngredient.bind(this);
        this.swapIngredient = this.swapIngredient.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.doSwap = this.doSwap.bind(this);
        this.revertIngredient = this.revertIngredient.bind(this);
    }

    setIssueIngredient() {
        this.props.setIngredient(this.state.ingredient);
        this.props.openModal();
    }

    swapIngredient(newIngredient) {
        this.setState({
            ingredient: newIngredient,
            hasSwapped: true
        });

        if (!this.state.hasSwapped) {
            this.setState({
                initialIngredient: this.state.ingredient
            });
        }
        this.closeModal();
    }

    doSwap() {
        this.props.onSwap(this.state.ingredient);
    }

    revertIngredient() {
        this.setState({
            ingredient: this.state.initialIngredient,
            hasSwapped: false,
            initialIngredient: null
        });
        this.closeModal();
    }

    renderModal = () => {
        if (this.state.hasSwapped) {
            return(
                <EthicalAlternative modalOpen={this.state.modalOpen} issueIngredient={this.state.initialIngredient} onClose={this.closeModal} onSwap={this.swapIngredient} hasSwapped={this.state.hasSwapped} doRevert={this.revertIngredient} />
            )
        }

        return(
            <EthicalAlternative modalOpen={this.state.modalOpen} issueIngredient={this.state.ingredient} onClose={this.closeModal} onSwap={this.swapIngredient} hasSwapped={this.state.hasSwapped} />
        )
    }

    openModal() {
        this.setState({modalOpen: true});
    };

    closeModal = (ingredient) => {
        this.setState({modalOpen: false, issueIngredient: ingredient});
    };


    render() {
        if (this.state.hasIssue && !this.state.hasSwapped) {
            var issueIndicator = <div className="Issue mt-2">
                                    <Button variant="link" onClick={this.openModal} ><FontAwesomeIcon icon={faExclamationCircle} />&nbsp;See possible issue with this ingredient</Button>
                                </div>;
        } else if (this.state.hasIssue && this.state.hasSwapped) {
            var issueIndicator = <div className="Issue mt-2">
                                    <Button variant="link" onClick={this.openModal} ><FontAwesomeIcon icon={faCheckCircle} />&nbsp;Great Choice! See other alternatives</Button>
                                </div>;
        }

        if (this.props.asAlternative) {
            var selectButton = <button className="btn btn-primary float-right" onClick={this.doSwap}>Select</button>;
        }
        return (
            <div className="Ingredient col-sm-6">
                <div className="card mb-3">
                    <div className="card-body">
                        <span className="capitalize">{this.state.ingredient.Name}</span>
                        {issueIndicator}
                        {selectButton}
                    </div>
                </div>
                {this.state.modalOpen && this.renderModal()}
            </div>
        );
    }
}
export default Ingredient;