import React, { Component } from 'react';
import { FetchRecipe } from '../requests/Api';
import Ingredient from './Ingredient';
import EthicalAlternative from './EthicalAlternative';

class Recipe extends Component {
    constructor (props) {
        super(props);
        this.id = this.props.recipeId;
        this.state = {
            recipe: null,
            modalOpen: false,
            issueIngredient: null
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setIssueIngredient = this.setIssueIngredient.bind(this);
    }

    componentDidMount() {
        FetchRecipe(this.id)
        .then(res => {
            return res.json();
        })
        .then(recipe => {
            this.setState({ recipe })
        });
    };

    openModal(e) {
        e.preventDefault();
        this.setState({modalOpen: true});
    };

    closeModal(e) {
        this.setState({modalOpen: false});
    };

    setIssueIngredient(ingredient) {
        this.setState({issueIngredient: ingredient});
    }


    render() {
        if (this.state.recipe === null) {
            return (
                <p>Recipe loading...</p>
            )
        } else {
            return (
                <div className="Recipe container">
                    <h1 className="my-5">{this.state.recipe[0].name}</h1>
                    <div className="d-inline-flex flex-row flex-wrap">
                        {this.state.recipe[0].ingredients.map((ingredient, index) => {
                            return <Ingredient ingredient={ingredient} key={index} openModal={this.openModal} setIngredient={this.setIssueIngredient} />
                        })}
                    </div>
                    
                    <EthicalAlternative modalOpen={this.state.modalOpen} onClose={this.closeModal} />
                </div>
                
            )
        }
    }
}

export default Recipe;