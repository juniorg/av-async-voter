// Import required packages
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let morgan = require('morgan');
let Stories = require(process.cwd() + '/routes/stories');
let config = require('config');

// DB connection
mongoose.connect(config.DBHost, config.DBOPTIONS);
mongoose.connection.on('error', console.error.bind(console, 'DB Connection error: '));

// Create the Express application
let app = express();

// don't log if 'NODE_ENV' is test
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

app.listen(config.PORT);
console.log("Listening on port " + config.PORT);

module.exports = app; // for testing
