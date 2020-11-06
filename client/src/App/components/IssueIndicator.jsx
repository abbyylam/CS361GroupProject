import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

class IssueIndicator extends Component {
    constructor(props) {
        super(props);
    }

    onClick = (e) => {
        e.preventDefault();
        console.log('Clicked');
    }

    render() {
        return (
            <div className="Issue mt-2">
                <FontAwesomeIcon icon={faExclamationCircle} />&nbsp;
                <a href="" onClick={this.onClick}>See possible issue with this ingredient</a>
            </div>
        )
    }
}

export default IssueIndicator;