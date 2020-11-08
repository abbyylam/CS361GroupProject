exports.recipe = function (req, res) {
    let recipeId = req.query.recipeId;

    let tempRecipeData = [{
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
            "ethicalIssues" : [{
                "id"    : 1,
                "name"  : "animal welfare",
                "description"   : "insufficient space and/or improper diet",
                "evidenceUrl"   : "https://www.ethicalconsumer.org/food-drink/shopping-guide/milk"
            }],
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

    res.send(tempRecipeData);
}