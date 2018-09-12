var db = require("../models");

module.exports = function(app) {
  // Get all threads
  app.get("/api/threads", function(req, res) {
    db.Thread.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  //get one thread
  app.get("/api/threads/:id", function(req, res) {
    db.Thread.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  // Create a new thread
  app.post("/api/threads", function(req, res) {
    db.Thread.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // Get all comments
  app.get("/api/comments", function(req, res) {
    db.Thread.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Create a new Comment ----------------------
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // Update a thread by id
  app.put("/api/threads", function(req, res) {
    console.log(res);
    db.Thread.update(req.body, {
      where: { id: req.params.id }
    }).then(function(data) {
      console.log(data);
      console.log("-------------------");
      res.json(data);
    });
  });

  // Delete a thread by id
  app.delete("/api/thread/:id", function(req, res) {
    db.Thread.destroy({ where: { id: req.params.id } }).then(function(data) {
      res.json(data);
    });
  });
};
