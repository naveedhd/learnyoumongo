var mongo = require('mongodb').MongoClient

var url = "mongodb://localhost:27017/learnyoumongo";
var age = parseInt(process.argv[2], 10);

// connect to specified url of database
mongo.connect(url, function(err, db) {
  // if error connecting to url: exit
  if (err) { return console.dir(err); }

  // if connected, next try to find the collection
  db.collection('parrots', function (err, collection) {
    // if collection not found: exit
    if (err) { return console.dir(err); }

    // next update the document
    collection.count({ age: {$gt: age} }, function(err, count) {
      if (err) { return console.dir(err); }
      console.log(count);
      db.close();
    });
  });
});
