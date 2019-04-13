var express = require('express');
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


module.exports = router;
