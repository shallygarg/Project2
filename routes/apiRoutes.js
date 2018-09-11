var bcrypt = require("bcrypt");
var db = require("../models");
var path = require("path");
var multer = require("multer");
var fs = require("fs");

var imageUpload = multer({
  dest: path.join(__dirname, "..", "public", "images", "uploads"),
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});

module.exports = function(app) {
  // Get all threads
  app.get("/api/threads", function(req, res) {
    db.Thread.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Create a new thread
  app.post("/api/threads", imageUpload.single("image"), function(req, res) {
    var createThread = function(imageFileName) {
      var threadData = Object.assign(
        { imageFileName: imageFileName },
        req.body
      );

      db.Thread.create(threadData).then(function(data) {
        res.json(data);
      });
    };

    if (req.file && req.file.mimetype.indexOf("image/") === 0) {
      var extension = req.file.originalname.split(".").pop();
      var imageFileName = req.file.filename + "." + extension;
      fs.rename(req.file.path, req.file.path + "." + extension, function(err) {
        if (err) {
          console.error(err);
          res.status(500).json(err);
        }

        createThread(imageFileName);
      });
    } else {
      createThread(imageFileName);
    }
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

  // bcrypt
  app.post("/bcrypt", function(req, res) {
    var password = req.body.password;
    var saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, passwordHashed) {
      db.Profile.create({ password: passwordHashed }).then(function(data) {
        res.json(data);
      });
    });
  })
};
