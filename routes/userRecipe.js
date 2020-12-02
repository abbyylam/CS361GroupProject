const recipe = require("./recipe");

module.exports = function(pool) {
    var module = {};
    var recipeId = module.create2;

    module.create = function (req, res) {
        let name = req.body.name;

        var sql = 'INSERT INTO recipe (Name) VALUES (?);';
        var values = [name];

        pool.query(sql, values, function(err, result) {
            if (err) {
                 console.log(err);
                return res.status(500).json({
                    'success': false,
                    'message': 'An error occurred'
                });
             }
            return res.status(200).json({
                'success': true,
                'message': "Recipe successfully created",
                recipeId: "hello"
            }
            );
        })


        console.log("THIS IS THE ID", module.create2);
        var sql = 'INSERT INTO userRecipe (Shareable, UserId, RecipeId) VALUES (?,?,?);';
        var values = [true, 1, recipeId];

        pool.query(sql, values, function(err, result) {
            if (err) {
                 console.log(err);
                return res.status(500).json({
                    'success': false,
                    'message': 'An error occurred'
                });
             }

            return res.status(200).json({
                'success': true,
                 'message': "userRecipe successfully created"
            });
        }) 
    
    };
    
    module.create2 = function (req, res) {
        let name = req.body.name;

        var sql = 'INSERT INTO recipe (Name) VALUES (?);';
        var values = [name];

        pool.query(sql, values, function(err, result) {
            if (err) {
                 console.log(err);
                return res.status(500).json({
                    'success': false,
                    'message': 'An error occurred'
                });
             }
            return result.insertId
        })
    
    };
    
    return module;

}
return module;
