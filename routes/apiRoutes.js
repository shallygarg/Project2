var db = require("../models");
var cfg = require("../data/config.js");
//var jwt = require("jwt-simple");
var jwt = require("jsonwebtoken");
var path = require("path");
var multer = require("multer");
var fs = require("fs");
var bcrypt = require("bcrypt");
var BCRYPT_SALT_ROUNDS = 10;

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

      if (req.body.id) {
        if (!req.file) {
          delete threadData.imageFileName;
        }

        db.Thread.update(threadData, { where: { id: req.body.id } }).then(
          function(data) {
            res.json(data);
          }
        );
      } else {
        db.Thread.create(threadData).then(function(data) {
          res.json(data);
        });
      }
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

  // Delete a thread by id
  app.post("/api/thread/:id/like", function(req, res) {
    db.Thread.findById(req.params.id).then(function(thread) {
      thread.likes++;
      thread.save().then(function(thread) {
        res.json(thread);
      });
    });
  });

  app.post("/token", function(req, res) {
    console.log("in token");
    if (req.body.userName && req.body.userPassword) {
      db.Users.findOne({
        where: { username: req.body.userName }
      }).then(function(data) {
        console.log("user found ----------------data");
        console.log(data);
        if (data === null) {
          console.log("user does not exist");
          res.json({
            message: "user does not exist. Please register before signing in"
          });
        } else {
          bcrypt.compare(req.body.userPassword, data.password, function(
            err,
            same
          ) {
            if (err) {
              console.log(err);
              res.json({
                message: "failed to compare passwords"
              });
              return;
            }

            if (!same) {
              res.json({
                message: "password does not match"
              });
              return;
            }

            var payload = {
              id: data.id
            };
            console.log(payload);
            //
            var token = jwt.sign(payload, cfg.jwtSecret);
            console.log(cfg.jwtSecret + "secret in api routes");
            console.log("payload id: " + payload.id);
            console.log("token generated: " + token);
            res.json({
              token: token
            });
            //res.json(data);
          });
        }
      });
    } else {
      console.log("Please enter credentials");
      res.sendStatus(401);
    }
  });

  app.post("/register", function(req, res) {
    console.log("Registering new user");
    if (req.body.userName && req.body.userPassword) {
      db.Users.findOne({
        where: { username: req.body.userName }
      }).then(function(data) {
        if (data !== null) {
          console.log("User already exists");
          res.json({
            message: "User already existst. Please select a different username"
          });
        } else {
          bcrypt.hash(req.body.userPassword, BCRYPT_SALT_ROUNDS, function(
            err,
            passwordHash
          ) {
            if (err) {
              console.log(err);
              res.json({
                message: "Failed to hash password"
              });
              return;
            }
            db.Users.create({
              username: req.body.userName,
              password: passwordHash
              //data
            }).then(function() {
              res.json({
                message:
                  "User created successfully. You can signin to Local threads now"
              });
            });
          });
        }
      });
    } else {
      console.log("Please enter a valid username and password");
      res.json({
        message: "Please enter a valid username and password"
      });
    }
  });
};
