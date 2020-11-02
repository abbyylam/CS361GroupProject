var path = require("path");

exports.index = function(req, res) {
    /* Routes all non-assigned routes to React home */
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
}