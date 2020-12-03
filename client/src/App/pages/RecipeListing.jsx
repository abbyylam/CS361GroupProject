import React from 'react';
import { withRouter, BrowserRouter } from 'react-router-dom';
import Recipe from '../components/Recipe';
import './RecipeListing.css';

function RecipeListing(props) {
    let recipeId

    if (props.match.params.recipeId) {
        recipeId = props.match.params.recipeId
    } else {
        recipeId = props.recipeId
    }

  return (
      <Recipe recipeId={recipeId} />
  );
}

export default withRouter(RecipeListing);