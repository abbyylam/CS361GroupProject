import React, { useState, useEffect } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import { FetchRecipe } from '../requests/Api';

function Recipe(props) {
    let id = props.match.params.recipeId;
    const [recipeData, setRecipeData] = useState([]);

    useEffect(() => {
        FetchRecipe(id)
        .then(res => res.json())
        .then(res => setRecipeData(res));
    }, []);

  return (
      "RECIPE"
  );
}

export default withRouter(Recipe);