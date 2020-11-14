import React, { Component } from 'react';
import IssueIndicator from './IssueIndicator';

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: this.props.ingredient,
            hasIssue: this.props.ingredient.hasIssue
        }
    }

    render() {
        return (
            <div className="Ingredient col-sm-6">
                <div className="card mb-3">
                    <div className="card-body">
                        <span className="name">{this.state.ingredient.name}</span>
                        {this.state.hasIssue && <IssueIndicator onClick={this.props.openModal} issueIngredient={this.props.ingredient} setIngredient={this.props.setIngredient} />}
                    </div>
                </div>
            </div>
        );
    }
}
export default Ingredient;