module.exports = function (pool) {

    var module = {};

    module.recipe = function (req, res) {
        let recipeId = req.query.recipeId;
        let recipe = {};

        getRecipeName()
        .then(getRecipeIngredients)
        .then(() => {
            res.send(recipe);
        });

        function getRecipeName() {
            let sql = 'SELECT recipe.id, recipe.Name FROM recipe WHERE recipe.id = ?';
            let values = [recipeId];
            return new Promise((resolve, reject) => {
                pool.query(sql, values, function(err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            'success': false,
                            'message': 'An error occurred'
                        });
                    }
    
                    if (result.length > 0) {
                        recipe.id = result[0].id;
                        recipe.name = result[0].Name;
                        resolve();
                    } else {
                        return res.status(404).json({
                            'success': false,
                            'message': 'Recipe not found'
                        });
                    }
                });
            })
        }

        function getRecipeIngredients() {
            let sql = 'SELECT ingredient.id, ingredient.Name, ingredient.HasIssue FROM recipe ' +
                  'JOIN recipeIngredient ON recipe.id = recipeIngredient.RecipeId ' +
                  'JOIN ingredient ON recipeIngredient.IngredientId = ingredient.id ' +
                  'WHERE recipe.id = ? ';
            let values = [recipeId];

            return new Promise(() => {
                pool.query(sql, values, function(err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            'success': false,
                            'message': 'An error occurred'
                        });
                    }
    
                    if (result.length > 0) {
                        recipe.ingredients = result;
                        return res.status(200).json({
                            'success': true,
                            'message': 'Recipe found',
                            'data': recipe
                        });
                    } else {
                        return res.status(404).json({
                            'success': false,
                            'message': 'Recipe not found'
                        });
                    }
                });
            })
        }
    }

    module.recipes = function(req, res) {
        let email = req.cookies.sessionId.split('|')[0]

        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT recipe.Name as name FROM user 
                INNER JOIN recipeBook ON user.Id = recipeBook.UserId 
                INNER JOIN recipeBookRecipe ON recipeBook.Id = recipeBookRecipe.BookId 
                INNER JOIN recipe ON recipeBookRecipe.RecipeId = recipe.Id 
                WHERE user.email=?`,
                [email],
                (error, result) => {
                    if (error) {
                        const err = new Error('Fetching Recipes Error')
                        
                        throw err
                    }

                    if (result.length > 0) {
                        return res.status(200).json({
                            'success': true,
                            'message': 'Recipes found',
                            'data': result
                        })
                    } else {
                        return res.status(404).json({
                            'success': false,
                            'message': 'Recipes not found',
                        })
                    }
                }
            )
        })
        .catch(err => {
            res.status(500).json({
                'success': false,
                'message': err.toString().slice(7)
            })
        })
    }

    return module;
}