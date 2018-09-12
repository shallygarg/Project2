var db = require("../models");
var auth = require("../data/auth");

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

  app.get("/signin", function(req, res) {
    res.render("signin", { bodyClass: "page-signin" });
  });

  app.get("/register", function(req, res) {
    res.render("register");
  });

  app.get("/signout", function(req, res) {
    res.render("signout");
  });

  app.get("/secret", auth.verifyToken, function(req, res) {
    console.log(req.user);
    res.render("secret");
  });

  // Load thread page and pass in a thread by id
  app.get("/thread/:id", function(req, res) {
    db.Thread.findOne({
      where: { id: req.params.id },
      include: [db.Comment]
    }).then(function(data) {
      res.render("thread", {
        thread: data
      });
      console.log(data.Comments[1].description);
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
