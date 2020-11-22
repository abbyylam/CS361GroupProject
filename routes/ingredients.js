module.exports = function (pool) {

    var module = {};

    
    module.ingredients = function (req, res) {
        var sql = 'SELECT * from ingredient';
      
        return pool.query(sql, function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'success': false,
                    'message': 'an error occurred'
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    'success': false,
                    'message': 'ingredients not found'
                })
            } else {
                return res.status(200).json({
                    'success': true,
                    'message': 'ingredients found',
                    'data': result
                });
            }
        })
    
        res.send(ingredientData);
    }

    module.ingredient = function (req, res) {
        let ingredientId = req.query.ingredientId;
        
        var sql = 'SELECT id, name, hasIssue from ingredient WHERE id = ?';
        var value = [ingredientId];

        return pool.query(sql, value, function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'success': false,
                    'message': 'an error occurred'
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    'success': false,
                    'message': 'ingredient not found'
                })
            } else {
                return res.status(200).json({
                    'success': true,
                    'message': 'ingredient found',
                    'data': result
                });
            }
        })
    }

    module.ingredientIssue = function (req, res) {
        let ingredientId = req.query.ingredientId;

        let sql = 'SELECT issue.Id, issue.Name, issue.Description, issue.EvidenceUrl FROM ingredient ' +
                    'JOIN ingredientIssue ON ingredient.id = ingredientIssue.IngredientId ' +
                    'JOIN issue ON ingredientIssue.IssueId = issue.Id ' +
                    'WHERE ingredient.id = ?';
        let value = [ingredientId];

        return pool.query(sql, value, function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'success': false,
                    'message': 'an error occurred'
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    'success': false,
                    'message': 'ingredient not found'
                })
            } else {
                return res.status(200).json({
                    'success': true,
                    'message': 'ingredient found',
                    'data': result[0]
                });
            }
        })
    }

    return module;
}