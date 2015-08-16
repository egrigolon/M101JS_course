var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db){
    if (err) throw err;

    var collection = db.collection('data');
    var query = {}; // return all documents
    var projection = {
        "State": true,
        "Temperature": true,
        "month_high": true,
        "_id": false
    };
    var options = {
        'sort': {
            "State": 1,
            "Temperature": -1
        }
    };

    collection.find(query, projection, options).toArray(function(err, docs){
        if (err) throw err;

        var currentState = '';

        docs.forEach(function(doc){
            //if (doc == null) return db.close();

            if (doc.State != currentState) {
                collection.update(doc, { "$set": { "month_high": true } }, function(err, result){
                    if (err) throw err;

                    console.log(doc.State + " with Temperature " + doc.Temperature + " was updated successfully.");
                });

                console.log(doc);

                currentState = doc.State;
            }
        });

        //db.close();
    });
});
