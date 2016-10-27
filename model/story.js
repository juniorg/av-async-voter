// Import the required packages
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Story schema definition
let StorySchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  }
);

// Sets createdAt parameter to current time
StorySchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

// Export schema for use elsewhere.
module.exports = mongoose.model('Story', StorySchema);
