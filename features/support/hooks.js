"use strict";

// Import required packages
let mongoose = require("mongoose");
let Story = require(process.cwd() + '/model/story');

module.exports.Hooks = function () {


  this.Before({tags: ["@clearDB"]}, function(scenario) {
    // This hook will be executed before scenarios tagged with @clearDB
    Story.remove({}, function(err) {
      if(err) {
        throw err;
      }
      console.log("DB cleared!");
    });
    scenario();
  });

};
