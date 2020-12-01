import React, { Component } from 'react';
import { FetchRecipe } from '../requests/Api';
import Ingredient from './Ingredient';

class Recipe extends Component {
    constructor (props) {
        super(props);
        this.id = this.props.recipeId;
        this.state = {
            success: null,
            message: '',
            recipe: null
        };
    }

    componentDidMount() {
        FetchRecipe(this.id)
        .then(res => {
            return res.json();
        })
        .then(recipe => {
            if (recipe.success) {
                this.setState({ 
                    success: recipe.success,
                    recipe: recipe.data 
                });
            } else {
                this.setState({
                    success: recipe.success,
                    message: recipe.message
                });
            }
        });
    };

    render() {
        if (this.state.success && !this.state.recipe) {
            return (
                <p>Recipe loading...</p>
            );
        } else if (!this.state.success) {
            return (
                <p>{this.state.message}</p>
            );
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