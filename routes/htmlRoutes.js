var db = require("../models");
var auth = require("../data/auth");

module.exports = function(app) {
  var jwt = require("jsonwebtoken");
  var cfg = require("../data/config.js");

  function verifyToken(req, res, success) {
    var token = req.query.token || req.headers.token; //token change
    console.log(token + "------------------------------");
    console.log(cfg.jwtSecret + "   secret");
    jwt.verify(token, cfg.jwtSecret, function(err, decodedToken) {
      //console.log(cfg.jwtSecret + "   secret");
      console.log(decodedToken + "------decoded");
      req.user = decodedToken;
      if (decodedToken !== undefined) {
        success();
      } else {
        console.log("you need to signin");
      }
    });
  }

  // Load index page

  app.get("/", verifyToken, function(req, res) {
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
  app.get("/thread/:id/edit", function(req, res) {
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
