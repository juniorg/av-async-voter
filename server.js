// Import the required packages
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let morgan = require('morgan');
let Stories = require('./routes/stories');
// load corresponsing DB from files in this dir
let config = require('config');

// DB options
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 5000 }
  },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 5000 }
  }
};

// DB connection
mongoose.connect(config.DBHost, options);
let DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'DB Connection error: '));

// Create the Express application
let app = express();
// Listen on 'PORT' if set, else on 8000
let port = process.env.PORT || 8000;

// don't log while 'NODE_ENV' is set to test
if( process.env.NODE_ENV !== 'test' ) {
  //use morgan for logging
  app.use(morgan('combined')); // write logs in Apache style
}

// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// Base route
app.get("/", (req, res) => res.json({message: "Welcome to Async Voter!"}));
// Create new route with prefix /stories
app.route("/stories")
  .get(Stories.getStories)
  .post(Stories.postStory);
app.route("/stories/:id")
  .get(Stories.getStory)
  .put(Stories.updateStory)
  .delete(Stories.deleteStory);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
