var Good = require("../models/good.js");
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var _ = require('lodash')

var upload = multer({ dest: 'uploads/img/'});

router.post("/add", upload.single('file'), function(req, res, next){
    let obj = req.file;
    let good = new Good({
        goodname : req.body.goodname,
        addTime: new Date().toLocaleString(),
        picUrl: '/img/' + obj.filename,
        status: req.body.status || 0,
        amount: req.body.amount || 0,
        desc: req.body.desc,
        price: req.body.price,
    });
    good.save(function (err, result) {
        if (err) {
            console.log("Error:" + err);
            res.json({
                code: 500,
                msg: err,
            })
        }
        else {
            res.json({
                code: 200,
                msg: '发布成功'
            }) 
        }
     });
});

router.post("/edit", upload.single('file'),  function(req, res, next){
    console.log('omit ', req.body)
    Good.findByIdAndUpdate(req.body.id, 
       req.body
    , function(err, result){
        console.log(result);
        if (err) {
            console.log("Error:" + err);
            res.json({
                code: 500,
                msg: err,
            })
        }
        else {
            res.json({
                code: 200,
                msg: '修改成功'
            }) 
        }
    })
});

router.get('/delete', function(req, res){
    Good.findByIdAndRemove(req.query.id,function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
});

router.get('/', function(req, res){
    Good.find().sort({"_id":-1}).exec(function(err, docs){
        res.render("goodlist", {title: '商品',list: docs , username: req.session.username});
    })
});

router.get('/api', function(req, res){
    Good.find({status: 1}).sort({"_id":-1}).exec(function(err, docs){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '获取成功',
                data: docs,
            })
        }
    })
});


router.get('/add', function(req, res){
    if(req.query.id){
        Good.findById(req.query.id,function(err, good){
            res.render("good", {title: '商品', item: good , username: req.session.username});
        })
    }else{
        res.render("good", {title: '商品', username: req.session.username});
    }
});

module.exports = router;