exports.search = function(req, res) {
    let recipes = ['Pepperoni Pizza', 'Cheese Pizza', 'Mushroom Pizza', 'Supreme Pizza'];
    let name = req.query.name
        ? req.query.name.toLowerCase()
        : undefined;
    let matches = recipes.filter(x => x.toLowerCase().includes(name));
    res.send(matches);
}