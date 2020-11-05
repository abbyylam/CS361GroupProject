const baseUrl = 'http://localhost:3000/api';

function RecipeSearch(recipeName, showUserRecipes) {
    const queryString = `name=${encodeURIComponent(recipeName)}`;
    if (showUserRecipes) queryString = `${queryString}&showUserRecipes`;

    let url = `${baseUrl}/search?${queryString}`;

    return(fetch(url));
}

function FetchRecipe(recipeId) {
    const queryString = `recipeId=${encodeURIComponent(recipeId)}`;
    let url = `${baseUrl}/recipe?${queryString}`;
    return(fetch(url));
}

function Other() {
    return (baseUrl + '/other');
}

module.exports = {
    RecipeSearch: RecipeSearch,
    FetchRecipe: FetchRecipe,
    Other: Other
};
