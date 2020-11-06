import React from 'react';
import { withRouter, BrowserRouter } from 'react-router-dom';
import Recipe from '../components/Recipe';

function RecipeListing(props) {
    const recipeId = props.match.params.recipeId;

  return (
      <Recipe recipeId={recipeId} />
  );
}

export default withRouter(RecipeListing);