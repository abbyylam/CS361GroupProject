const { response } = require("express");

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
        
        /*let tempRecipeData = [{
            "id"            : 1,
            "name"          : "Spinach and Mushroom Pizza",
            "ingredients"   : [{
                "id"    : 1,
                "name"  : "flour",
                "hasIssue"   : false
            },
            {
                "id"    : 2,
                "name"  : "salt",
                "hasIssue"  : false
            },
            {
                "id"    : 3,
                "name"  : "water",
                "hasIssue"  : false
            },
            {
                "id"    : 4,
                "name"  : "yeast",
                "hasIssue"  : false
            },
            {
                "id"    : 5,
                "name"  : "tomato sauce",
                "hasIssue"  : false
            },
            {
                "id"    : 6,
                "name"  : "mozarella cheese",
                "hasIssue"  : true,
                "ethicalIssues" : {
                    "id"    : 1,
                    "name"  : "treatment of animals",
                    "description"   : "poor living conditions, insufficient space and/or improper diet",
                    "evidenceUrl"   : "https://en.wikipedia.org/wiki/Animal_welfare#Farm_animals"
                },
                "altIngredients"    : [{
                    "id"    : 7,
                    "name"  : "milk - pasture raised",
                    "hasIssue"  : false
                },
                {
                    "id"    : 8,
                    "name"  : "soy milk",
                    "hasIssue"  : false
                },
                {
                    "id"    : 9,
                    "name"  : "nut-based milk",
                    "hasIssue"  : false
                }
            ]
            },
            {
                "id"    : 10,
                "name"  : "spinach",
                "hasIssue"  : false
            },
            {
                "id"    : 11,
                "name"  : "mushroom",
                "hasIssue"  : false
            }
        ]
        }];
    
        res.send(recipeData);*/
    }

    return module;
}