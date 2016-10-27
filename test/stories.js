// During tests, "NODE_ENV" is set to "test"
process.env.NODE_ENV = 'test';

// Import the required packages
let mongoose = require("mongoose");
let Story = require('../model/story');

// Import required dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// Parent block
describe('Stories', () => {
  beforeEach((done) => {
    Story.remove({}, (err) => {
      done();
    });
  });

  // Test route "POST /stories"
  describe('POST /stories', () => {
    it('should POST new story', (done) => {
      let story = {
        title: "Vote on a feature",
        url: "https://github.com/story1.git",
        size: 1
      }
      chai.request(server)
        .post('/stories')
        .send(story)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Story created successfully');
          res.body.story.should.have.property('title');
          res.body.story.should.have.property('url');
          res.body.story.should.have.property('size');
      done();
      });
    });
  });

  // Test route "GET /stories"
  describe('GET /stories', () => {
    it('should GET list of stories', (done) => {
      chai.request(server)
        .get('/stories')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
      done();
      });
    });
  });

  // Test route "GET /stories/:id"
  describe('GET /stories/:id', () => {
    it('should GET a story given the id', (done) => {
      let story = new Story(
        { title: "Vote on a feature",
          url: "https://github.com/story1.git",
          size: 1
        });
      story.save((err, story) => {
        chai.request(server)
          .get('/stories/' + story._id)
          .send(story)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('url');
            res.body.should.have.property('size');
            res.body.should.have.property('_id').eql(story.id);
      done();
        });
      });
    });
  });

  // Test route "PUT /stories/:id"
  describe('PUT /stories/:id', () => {
    it('should UPDATE a story given the id', (done) => {
      let story = new Story(
        { title: "Vote on a feature",
          url: "https://github.com/story1.git",
          size: 1
        }
      );
      story.save((err, story) => {
        chai.request(server)
          .put('/stories/' + story._id)
          .send(
            {
              size: 3
            }
          )
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Story updated');
            res.body.story.should.have.property('size').eql(3);
      done();
        });
      });
    });
  });

  // Test route "DELETE /stories/:id"
  describe('DELETE /stories/:id', () => {
    it('should DELETE a story given the id', (done) => {
      let story = new Story(
        { title: "Vote on a feature",
          url: "https://github.com/story1.git",
          size: 1
        }
      );
      story.save((err, story) => {
        chai.request(server)
          .delete('/stories/' + story._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Story deleted successfully');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
      done();
        });
      });
    });
  });

});
