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
            this.setState({ recipe: recipe.data })
        });
    };

    renderModal = () => {
        const {modalOpen, issueIngredient} = this.state;

        return(
            <EthicalAlternative modalOpen={this.state.modalOpen} issueIngredient={this.state.issueIngredient} onClose={this.closeModal} />
        )
    }

    openModal() {
        this.setState({modalOpen: true});
    };

    closeModal = (ingredient) => {
        this.setState({modalOpen: false, issueIngredient: ingredient});
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
                    <h1 className="my-5 capitalize">{this.state.recipe.name}</h1>
                    <div className="d-inline-flex flex-row flex-wrap">
                        {this.state.recipe.ingredients.map((ingredient, index) => {
                            return <Ingredient ingredient={ingredient} key={index} openModal={this.openModal} setIngredient={this.setIssueIngredient} />
                        })}
                    </div>
                    
                    {this.state.issueIngredient && this.state.modalOpen && this.renderModal()}
                </div>
                
            )
        }
    }
}

export default Recipe;