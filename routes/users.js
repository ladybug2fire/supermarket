var User = require('../models/user')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  User.find().sort({"_id":-1}).exec(function(err, docs){
      res.render("userlist", {title: '用户管理',list: docs, username: req.session.username || '' });
  })
});

router.get('/delete', function(req, res){
  User.findByIdAndRemove(req.query.id, (err, result)=>{
      if(err){
          res.json({
              code: 500,
              msg: '异常'
          })
      }else{
          res.json({
              code: 200,
              msg: '删除成功'
          })
      }
  })
});
module.exports = router;
