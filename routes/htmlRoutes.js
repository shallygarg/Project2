var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Thread.findAll({}).then(function(data) {
      res.render("index", {
        msg: "Welcome to Local Threads!",
        threads: data
      });
    });
  });

  // Load thread page and pass in a thread by id
  app.get("/thread/:id", function(req, res) {
    db.Thread.findOne({ where: { id: req.params.id } }).then(function(data) {
      res.render("thread", {
        thread: data
      });
    });
  });

  // Load page to edit post
  app.get("/thread/edit/:id", function(req, res) {
    db.Thread.findOne({ where: { id: req.params.id } }).then(function(data) {
      res.render("edit", {
        thread: data
      });
    });
  });

  // Render locations
  app.get("/locations", function(req, res) {
    db.Thread.findOne({ where: { id: req.params.id } }).then(function(data) {
      res.render("locations", {
        location: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
