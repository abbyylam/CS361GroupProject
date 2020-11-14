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

function CreateAccount(email, password) {
    let url = `${baseUrl}/account`;
    let data = {
        'email': email,
        'password': password
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return(fetch(url, requestOptions));
}

module.exports = {
    RecipeSearch: RecipeSearch,
    FetchRecipe: FetchRecipe,
    CreateAccount: CreateAccount
};
