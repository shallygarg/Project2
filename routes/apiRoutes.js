var db = require("../models");

module.exports = function(app) {
  // Get all threads
  app.get("/api/threads", function(req, res) {
    db.Thread.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Create a new thread
  app.post("/api/threads", function(req, res) {
    db.Thread.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // Edit a thread by id
  app.put("/api/threads", function(req, res) {
    db.Thread.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(data) {
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
