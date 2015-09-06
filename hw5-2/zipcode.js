use test;

db.zips.aggregate([
    {
        $group : {
            _id : { city : "$city", state : "$state" },
            pop : { $sum : "$pop" },
            zipcodes : { $addToSet : "$_id" }
        }
    },
    {
        $match : {
            $or : [ { "_id.state" : "CA" }, { "_id.state" : "NY" } ],
            pop: { $gt : 25000 }
        }
    },
    {
        $group : {
            _id : "$_id.state",
            avg_pop : { $avg : "$pop" }
        }
    },
    {
        $group : {
            _id : null,
            average : { $avg : "$avg_pop" }
        }
    }
]);
