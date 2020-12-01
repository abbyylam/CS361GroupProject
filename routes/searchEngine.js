const getUserIdFromSession = require('./helper/getUserIdFromSession')

module.exports = function(pool) {
    var module = {};

    module.search = function (req, res) {

        var recipeName = req.query.name
            ? req.query.name.toLowerCase()
            : undefined;

        var showOwnedRecipes = 'showUserRecipes' in req.query;

        if (!recipeName || recipeName.length === 0) {
            return res.status(200).json({
                'success': true,
                'message': '',
                'data': []
            });
        }

        recipeSearch(recipeName, showOwnedRecipes)
            .then((results) => res.status(200).json(
                    {
                        'success': true,
                        'message': '',
                        'data': results
                    }), (error) => {
                        console.log(error);
                        return res.status(500).json(
                            {
                                'success': false,
                                'message': ''
                            }
                        );
                });

        function recipeSearch(searchValue, showOwnedRecipes) {
            return new Promise(function(resolve, reject) {
                var sessionId = 'sessionId' in req.cookies
                    ? req.cookies.sessionId.split('|')[1]
                    : undefined;

                const baseSql = 'SELECT recipe.Id from recipe ' +
                    'LEFT JOIN userRecipe ON recipe.id = userRecipe.RecipeId ' +
                    'WHERE recipe.Name LIKE ? ' +
                    'AND (userRecipe.Shareable IS NULL)';

                const guestSql = baseSql + ' OR (userRecipe.Shareable = TRUE);';

                const userSql = (showOwnedRecipes)
                    ? baseSql + ' OR (userRecipe.UserId = ?);'
                    : baseSql + ' OR (userRecipe.Shareable = TRUE AND userRecipe.UserId <> ?);';

                getUserIdFromSession(pool, sessionId)
                .then((userId) => {
                    const effectiveSql = (userId)
                        ? userSql
                        : guestSql;

                    var values = ['%' + searchValue + '%'];
                    if (userId) {
                        values.push(userId)
                    }

                    pool.query(effectiveSql, values, function(err, result) {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                });
            });
        }
    }
    return module;
}

return module;