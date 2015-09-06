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
            "_id.city" : { $regex : /\d/ }
        }
    },
    {
        $group : {
            _id : null,
            pop : { $sum : "$pop" }
        }
    }
]);
