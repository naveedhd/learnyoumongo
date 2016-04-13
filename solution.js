var mongo = require('mongodb').MongoClient

var url = "mongodb://localhost:27017/learnyoumongo";
var firstName = process.argv[2];
var lastName = process.argv[3];
var doc = {
  firstName: firstName,
  lastName: lastName
}

// connect to specified url of database
mongo.connect(url, function(err, db) {
  // if error connecting to url: exit
  if (err) { return console.dir(err); }

  // if connected, next try to find the collection
  db.collection('docs', function (err, collection) {
    // if collection not found: exit
    if (err) { return console.dir(err); }

    // next insert into collection
    collection.insert(doc, function(err, data) {
      if (err) { return console.dir(err); }
      console.log(JSON.stringify(doc));
      db.close();
    });
  });
});
