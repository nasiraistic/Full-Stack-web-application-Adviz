var express = require("express");
var router = express.Router();

var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/adbizDB";

router.post("/", function (req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("advizDB");
    console.log("connected to db");

    dbo
      .collection("users")
      .findOne({ userId: req.body.username }, function (err, result) {
        console.log("found");
        if (err) throw err;

        if (result) {
          if (
            result.userId == req.body.username &&
            result.password == req.body.password
          ) {
            console.log("yes");
            res.status(200).json(result);
          } else {
            res.status(401).send();
          }
        } else {
          res.status(401).send();
        }
      });
  });
});

module.exports = router;
