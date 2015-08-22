var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db){
    if (err) throw err;

    var collection = db.collection('students');
    var query = {};
    var cursor = collection.find();

    cursor.each(function(err, doc){
        if (doc === null) {
            return db.close();
        }

        var _id = doc['_id'];
        var scores = doc.scores;
        var lowest = null;

        scores.forEach(function(score, index){
            if (score.type != 'homework') return; // skip score that's not homework

            if( (lowest == null) || (score.score < lowest) ) {
                lowest = score.score;
            }
        });

        collection.update( { '_id': _id }, { $pull: {  'scores' : { 'score': lowest } } } );
    });
});
