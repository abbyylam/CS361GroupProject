import React, { Component } from 'react';
import { FetchRecipe } from '../requests/Api';
import Ingredient from './Ingredient';

class Recipe extends Component {
    constructor (props) {
        super(props);
        this.id = this.props.recipeId;
        this.state = { recipe: null};
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


    render() {
        if (this.state.recipe === null) {
            return (
                <p>Recipe loading...</p>
            )
        } else {
            return (
                <div className="Recipe container">
                    <h1 className="my-5">{this.state.recipe[0].name}</h1>
                    <div className="row">
                        {this.state.recipe[0].ingredients.map((ingredient, index) => {
                            return <Ingredient ingredient={ingredient} />
                        })}
                    </div>
                </div>
                
            )
        }
    }
}

export default Recipe;