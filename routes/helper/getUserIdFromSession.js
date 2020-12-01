const getUserIdFromSession = (sqlPool, sessionId) => {
    return new Promise(function(resolve, reject) {
        if (!sessionId) resolve(null);

        var sql = 'SELECT Id from user where sessionId = ? LIMIT 1;';
        var values = [sessionId];

        sqlPool.query(sql, values, function(err, result) {
            if (err) {
                reject(err);
            }
            if (result.length > 0) {
                resolve(result[0].Id);
            } else {
                resolve(null);
            }
        });
    });
}

module.exports = getUserIdFromSession;
