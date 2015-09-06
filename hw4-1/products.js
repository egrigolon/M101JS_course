/**
 * Homework 4-1
 *
 * Insert dummy data to database
 */

var brands = [
    "GE",
    "JVC",
    "Sony"
];

db.products.drop();

for ( i = 0; i < 1000; i++ ) {

    var price = Math.floor((Math.random() * 100) + 100), // Random price between 100 and 200
        description = "Product description " + i,
        category = Math.floor((Math.random() * 15) + 1), // Random category between 1 and 15
        brand = Math.floor((Math.random() * 3) + 0); // Random brand beteen 0 and 2

    db.products.insert({
        "sku" : i,
        "price" : price,
        "description" : description,
        "category" : category,
        "brand" : brands[brand],
        "reviews" : [
            {
                "author" : "John Doe",
            },
            {
                "author" : "Jane Doe",
            },
            {
                "author" : "Mark",
            },
            {
                "author" : "Richard",
            }
        ]
    });

    print("Product " + i + " inserted.");

}

db.products.dropIndexes();

db.products.createIndex( { "sku" : 1 }, { "unique" : true } );
db.products.createIndex( { "price" : -1 } );
db.products.createIndex( { "description" : 1 } );
db.products.createIndex( { "category" : 1, "brand" : 1 } );
db.products.createIndex( { "reviews.author" : 1 } );
