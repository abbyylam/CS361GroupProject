import React, { useState, useEffect }from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie'

import RecipeListing from './RecipeListing'

import { FetchRecipes } from '../requests/Api'

function RecipeBook() {
    const hasSessionId = Cookies.get('sessionId')

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        if (hasSessionId) {
            FetchRecipes()
            .then(res => res.json())
            .then(result => {
                setRecipes(result.data)
            })
        }
    }, [])
    
    return (
        <div>
            <div>
                {
                    recipes.map(recipe => (
                        <RecipeListing recipeId={recipe.id}/>
                    ))
                }
            </div>
        </div>
    );
}

export default withRouter(RecipeBook);