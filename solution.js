var mongo = require('mongodb').MongoClient

var url = "mongodb://localhost:27017/learnyoumongo";
var size = process.argv[2];

// connect to specified url of database
mongo.connect(url, function(err, db) {
  // if error connecting to url: exit
  if (err) { return console.dir(err); }

  // if connected, next try to find the collection
  db.collection('prices', function (err, collection) {
    // if collection not found: exit
    if (err) { return console.dir(err); }

    // next update the document
    collection.aggregate([
      { $match: { size: size } },
      { $group: { _id: 'avg', avg: { $avg: '$price' }}}
    ]).toArray(function(err, results) {
      if (err) { return console.dir(err); }
      if (!results.length) {
        throw new Error('No results found');
      }
      console.log(Number(results[0].avg).toFixed(2));
      db.close();
    });
  });
});
