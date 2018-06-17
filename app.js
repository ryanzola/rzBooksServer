var express = require('express');
var graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');


// Create an express server and graphQL endpoint
var app = express();

// allow cross-origin requests
app.use(cors());

const uri = 'mongodb+srv://ryanzola:11Passvip02!@graphcluster-ta2bv.mongodb.net/test?retryWrites=true';
const encodedUri = encodeURI(uri)
mongoose.Promise = global.Promise;
mongoose.connect(encodedUri)
  .catch(err => {
    console.log()
  });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('yas, db connection established!')
});


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(4000, () => {
  console.log(`server is listening on port 4000`)
})