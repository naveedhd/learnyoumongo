var mongo = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/' +  process.argv[2];

// connect to specified url of database
mongo.connect(url, function(err, db) {
  // if error connecting to url: exit
  if (err) { return console.dir(err); }

  // if connected, next try to find the collection
  db.collection('users', function (err, collection) {
    // if collection not found: exit
    if (err) { return console.dir(err); }

    // next update the document
    collection.update({
      username: 'tinatime'
    }, {
      $set: {
        age: 40
      }
    }, function(err, data) {
      if (err) { return console.dir(err); }
      db.close();
    });
  });
});
