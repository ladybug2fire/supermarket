var express = require('express');
var Order = require('../models/order')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.admin){
      res.render('index', { title: 'Express',username: req.session.username });
  }else{
      res.redirect('/login');
  }
});

router.get('/index', function (req, res, next) {
  res.render('index', { title: 'Express' , username: req.session.username});
});

router.get('/logout', function(req, res){
  req.session.username = null;
  req.session.userid = null;
  res.redirect('/')
})

router.get('/order', function(req, res, next){
  Order.find().sort({"_id":-1}).exec(function(err, docs){
    res.render("orderlist", {title: '订单管理',list: docs , username: req.session.username});
  })
})

module.exports = router;
