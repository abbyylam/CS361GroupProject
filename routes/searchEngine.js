module.exports = function(pool) {
    var module = {};

    module.search = function (req, res) {

        var recipeName = req.query.name
            ? req.query.name.toLowerCase()
            : undefined;

        if (!recipeName || recipeName.length === 0) {
            return res.status(200).json({
                'success': true,
                'message': '',
                'data': []
            });
        }

        recipeSearch(recipeName)
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

        function recipeSearch(searchValue) {
            return new Promise(function(resolve, reject) {
                var sql = 'SELECT Id from recipe WHERE Name LIKE ?;';
                var values = ['%' + searchValue + '%'];

                pool.query(sql, values, function(err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }
    }
    return module;
}

return module;