// Import the required packages
let mongoose = require('mongoose');
let Story = require(process.cwd() + '/model/story');

// Route "POST /stories" - saves a new story.
function postStory(req, res) {
  // Creates a new story
  let newStory = new Story(req.body);
  // Save story to the DB.
  newStory.save((err, story) => {
    if(err) {
      res.send("Something went wrong: " + err);
    }
    else {
      res.json({ message: "Story created successfully", story });
    }
  });
}

// Route "PUT /stories/:id" - updates a story given it's id
function updateStory(req, res) {
  Story.findById({_id: req.params.id }, (err, story) => {
    if(err) {
      res.send("Something went wrong: " + err);
    }
    else {
      Object.assign(story, req.body).save((err, story) => {
        if(err) {
          res.send("Something went wrong: " + err);
        }
        else {
          res.json({ message: 'Story updated', story });
        }
      });
    }
  });
}

// Route "GET /stories/:id" - retrieves a story given it's id.
function getStory(req, res) {
  Story.findById(req.params.id, (err, story) => {
    if(err) {
      res.send("Something went wrong: " + err);
    }
    else {
      res.json(story);
    }
  });
}

// Route "GET /stories" - retrieve all stories.
function getStories(req, res) {
  let query = Story.find({});
  query.exec((err, stories) => {
    if(err) {
      res.send("Something went wrong: " + err);
    }
    else {
      res.json(stories);
    }
  });
}

// Route "DELETE /stories/:id" - delete a story given it's id.
function deleteStory(req, res) {
  Story.remove({_id : req.params.id}, (err, result) => {
    if(err) {
      res.send("Something went wrong: " + err);
    }
    else {
      res.json({ message: "Story deleted successfully", result });
    }
  });
}

// export all the functions
module.exports = { getStories, postStory, getStory, updateStory, deleteStory };
