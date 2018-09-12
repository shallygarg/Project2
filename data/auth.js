var jwt = require("jsonwebtoken");
var cfg = require("../data/config.js");

function verifyToken(req, res, next) {
  const token = req.query.token || req.headers.token //token change
  console.log(token + "------------------------------");
  console.log(cfg.jwtSecret + "   secret");
  jwt.verify(token, cfg.jwtSecret, function(err, decodedToken) {
    //console.log(cfg.jwtSecret + "   secret");
    console.log(decodedToken + "--decodedcoded");
    req.user = decodedToken;
    next();
  })

}

module.exports = {verifyToken: verifyToken};
