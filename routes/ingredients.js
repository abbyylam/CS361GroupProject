module.exports = function (pool) {

    var module = {};

    
    module.ingredients = function (req, res) {
        let ingredientId = req.query.ingredientId;
        
        var sql = 'SELECT * from ingredient';
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

    return module;
}