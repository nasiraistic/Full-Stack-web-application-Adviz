var express = require("express");
var router = express.Router();

var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/adbizDB";

// add a new contact
router.post("/", function (req, res, next) {
  // insert new contact to the database
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var newContacts = {
      Title: req.body.title,
      gender: req.body.gender,
      Firstname: req.body.forename,
      Surename: req.body.surname,
      Street: req.body.street,
      postalcode: req.body.postalcode,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email,
      moreInfos: req.body.moreInfos,
      privateFlag: req.body.privateFlag,
      ownerId: req.body.ownerId,
    };
    console.log(newContacts);
    var dbo = db.db("advizDB");
    dbo.collection("contacts").insertOne(newContacts, function (err, result) {
      if (err) throw err;
      console.log("New contacts inserted");
      if (result) {
        // set header
        res.set({
          Location: "/adviz/contacts/" + result._id,
        });
        // send response to client
        res.status(201).json({
          id: result._id,
          title: req.body.title,
          gender: req.body.gender,
          forename: req.body.forename,
          surname: req.body.surname,
          street: req.body.street,
          postalcode: req.body.postalcode,
          city: req.body.city,
          country: req.body.country,
          email: req.body.email,
          moreInfos: req.body.moreInfos,
          privateFlag: req.body.privateFlag,
          ownerID: req.body.ownerId,
        });
      }
    });
  });
});
module.exports = router;
