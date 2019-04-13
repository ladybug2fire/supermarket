var User = require('../models/user')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {layout: false});
});

router.post('/', function(req, res, next) {
    User.findOne({username: req.body.username},function(err, result){
        console.log('find usr', result)
        if(result && result.password == req.body.password){
          req.session.username = req.body.username;
          req.session.userid = result._id;
          res.redirect('/index');
        }else{
           res.render('error', {message:'账号或密码错误',error:{}, title: '发生错误', layout:false, username: ''})
        }
    })
});

router.post('/signup', function(req, res){
    if(!req.body.username||!req.body.password){
        res.json('用户名或密码不能为空!!')
    }
    User.find({ username: req.body.username}, function(err, result){
        if(result.length){
            res.render('error', {message:'用户名被占用',error:{}, title: '用户名被占用', layout:false, username: ''})
        }else{
            console.log(req.body)
            var user = new User({
                username : req.body.username,
                password: req.body.password,
                email: req.body.email,
            });
            user.save(function (err, result) {
                if (err) {
                    res.render('error', {message:'出错了',error:{}, title: '发生错误', layout:false, username: ''})
                }
                else {
                   res.redirect('/') 
                }
            });
        }
    })
})

module.exports = router;