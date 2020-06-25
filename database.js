const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://harshkumar1:hsrahkum@cluster0-c8kfb.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true";
var state = {
    db: null,
}

exports.connect = function(done) {
    if (state.db) return done()

    MongoClient.connect(uri, function(err, db) {
        if(err) return done(err);
        state.db = db.db('mydb');
        done();
    })
}

exports.get = function() {
    return state.db;
}
