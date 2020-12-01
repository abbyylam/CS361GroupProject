import React, { useState, useEffect }from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie'

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
            <h3>This is your Recipe Book</h3>
            <div>
                {
                    recipes.map(recipe => (
                        <div>{recipe.name}</div>
                    ))
                }
            </div>
        </div>
    );
}

export default withRouter(RecipeBook);