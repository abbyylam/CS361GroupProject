import React, { Component } from 'react';
import IssueIndicator from './IssueIndicator';

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.name = this.props.ingredient.name;
        this.hasIssue = this.props.ingredient.hasIssue;
    }

    render() {
        return (
            <div className="Ingredient col-sm-6">
                <div className="card mb-3">
                    <div className="card-body">
                        <span className="name">{this.name}</span>
                        {this.hasIssue && <IssueIndicator />}
                    </div>
                </div>
            </div>
        );
    }
}
export default Ingredient;