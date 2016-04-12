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

    // next if collection is found, find elements
    collection.find( {age: { $gt: age } })
      .toArray(function(err, documents) {
        if (err) { return console.dir(err); }
        
        console.log(documents)

        // since node is async: db close sits here
        db.close();
      });
  });

});
