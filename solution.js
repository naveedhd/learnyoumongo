var mongo = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/' +  process.argv[2];
var collection = process.argv[3];
var id = process.argv[4];

// connect to specified url of database
mongo.connect(url, function(err, db) {
  // if error connecting to url: exit
  if (err) { return console.dir(err); }

  // if connected, next try to find the collection
  db.collection(collection, function (err, collection) {
    // if collection not found: exit
    if (err) { return console.dir(err); }

    // next update the document
    collection.remove({ _id: id }, function(err, data) {
      if (err) { return console.dir(err); }
      db.close();
    });
  });
});
