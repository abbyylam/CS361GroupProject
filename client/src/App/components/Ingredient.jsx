import React, { Component } from 'react';
import IssueIndicator from './IssueIndicator';

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.ingredient.name,
            hasIssue: this.props.ingredient.hasIssue
        }
    }

    render() {
        return (
            <div className="Ingredient col-sm-6">
                <div className="card mb-3">
                    <div className="card-body">
                        <span className="name">{this.state.name}</span>
                        {this.state.hasIssue && <IssueIndicator onClick={this.props.openModal} />}
                    </div>
                </div>
            </div>
        );
    }
}
export default Ingredient;