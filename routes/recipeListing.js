exports.recipe = function (req, res) {
    let recipeId = req.query.recipeId;

    let tempRecipeData = [{
        "id"            : 1,
        "name"          : "Spinach and Mushroom Pizza",
        "ingredients"   : ['flour', 'salt', 'water', 'yeast', 'tomato sauce', 'mozarella cheese', 'spinach', 'mushrooms']
    }];

    res.send(tempRecipeData);
}