var express = require("express");
var Good = require("../models/good");

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  Good.find()
    .sort({ _id: -1 })
    .exec(function(err, docs) {
      res.render("cash", {
        title: "收银台",
        list: docs,
        username: req.session.username
      });
    });
});

module.exports = router;
