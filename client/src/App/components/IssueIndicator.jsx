import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

class IssueIndicator extends Component {
    constructor(props) {
        super(props);

        this.ingredient = this.props.issueIngredient;

        this.setIssueIngredient = this.setIssueIngredient.bind(this);
    }

    setIssueIngredient(e) {
        e.preventDefault();
        this.props.setIngredient(this.ingredient);
        this.props.onClick();
    }

    render() {
        return (
            <div className="Issue mt-2">
                <FontAwesomeIcon icon={faExclamationCircle} />&nbsp;
                <a href="" onClick={this.setIssueIngredient}>See possible issue with this ingredient</a>
            </div>
        )
    }
}

export default IssueIndicator;