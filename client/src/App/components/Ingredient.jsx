import React, { Component } from 'react';

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.name = this.props.ingredient.name;
    }

    render() {
        return (
            <div className="Ingredient col-sm-6">
                <div className="card mb-3">
                    <div className="card-body">
                        {this.name}
                    </div>
                </div>
            </div>
        );
    }
}
export default Ingredient;