var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var login = require("./routes/login");
var addNew = require("./routes/addNew");
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/adbizDB";
const bodyParser = require("body-parser");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extend: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/adviz/login", login);
app.use("/adviz/contacts", addNew);
//app.use("/adviz/contacts/own/:userid", showOwn);
//app.use("/adviz/contacts/all/:userid", showAll);

//app.use("/adviz/login", testAPIRouter);

app.get("/adviz/contacts/own/:userid", function (req, res, next) {
  console.log("show own!");
  res.set({
    "Content-Type": "application/json",
  });

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("connected");
    var dbo = db.db("advizDB");
    dbo
      .collection("contacts")
      .find({ ownerId: req.params.userid })
      .toArray(function (err, result) {
        if (err) throw err;
        if (result) {
          res.status(200).json(result);
        }
      });
  });
});

// send all the contacts of the requested user
app.get("/adviz/contacts/all/:userid", function (req, res) {
  console.log("show all!");
  res.set({
    "Content-Type": "application/json",
  });

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("connected!!!!!!!");
    var dbo = db.db("advizDB");
    if (req.params.userid == "admina") {
      dbo
        .collection("contacts")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          if (result) {
            res.status(200).json(result);
          }
        });
    } else if (req.params.userid == "normalo") {
      dbo
        .collection("contacts")
        .find({
          $or: [{ ownerId: req.params.userid }, { privateFlag: false }],
        })
        .toArray(function (err, result) {
          if (err) throw err;
          if (result) {
            res.status(200).json(result);
          }
        });
    }
  });
});

// update user info
app.put("/adviz/contacts/:id", function (req, res) {
  console.log("update!");
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("connected");
    var dbo = db.db("advizDB");

    var query = { _id: ObjectID(req.params.id) };
    console.log(query);
    var newQuery = {
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
    console.log(newQuery);
    dbo
      .collection("contacts")
      .updateOne(query, { $set: newQuery }, function (err, result) {
        if (err) throw err;
        if (result) {
          console.log(result.modifiedCount + " update successed");
          res.status(204).send();
        }
      });
  });
});

app.delete("/adviz/contacts/:id", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db("advizDB");

    var query = { _id: ObjectID(req.params.id) };
    console.log(query);
    dbo.collection("contacts").deleteOne(query, function (err, result) {
      if (err) throw err;
      if (result) {
        console.log(result.modifiedCount + " delete successed");
        res.status(204).send();
      }
    });
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("not working");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
