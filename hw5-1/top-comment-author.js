use blog;

db.posts.aggregate([
    {
        $unwind : "$comments"
    },
    {
        $group : {
            _id : "$comments.author",
            comments : { $sum : 1 }
        }
    },
    {
        $sort : {
            comments: -1
        }
    },
    {
        $limit : 1
    },
    {
        $project : {
            _id : 0,
            author : "$_id",
            comments : 1
        }
    }
]);
