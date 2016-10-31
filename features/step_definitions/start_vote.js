// During testing, "NODE_ENV" is set to "test"
process.env.NODE_ENV = 'test';

// Import required packages
let mongoose = require("mongoose");
let Story = require(process.cwd() + '/model/story');

// Import required dev-dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require(process.cwd() + '/server');
let expect = chai.expect;
chai.use(chaiHttp);

module.exports = function() {

  let story = {
    name: "Start ballot",
    url: "https://github.com/story1.git",
    size: 1
  }

  let id;

  this.Given(/that I submit a new story to the bot/, function(done) {

    chai.request(server)
      .post('/stories')
      .send(story)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property('message').equal('Story created successfully');
        expect(res.body.story).to.have.property('name');
        expect(res.body.story).to.have.property('size');
        expect(res.body.story).to.have.property('url');

        id = res.body.story._id


    done();

    });

  });

  this.Then(/^the bot should return an id of that new ballot$/, function(done) {

    expect(id).to.be.a("string");

    done();

  });
};
console.log("Tests ran!");
