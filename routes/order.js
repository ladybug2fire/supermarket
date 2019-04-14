var express = require('express');
var Order = require('../models/order')
var Good = require('../models/good')
var router = express.Router();

router.get('/', function(req, res, next){
  Order.find().sort({"_id":-1}).exec(function(err, docs){
    res.render("orderlist", {title: '订单管理',list: docs , username: req.session.username});
  })
})

router.get('/api', function(req, res){
  Order.find().sort({"_id":-1}).exec(function(err, docs){
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


router.post('/add', async function(req, res, next){
  var order = new Order({...req.body, addTime: new Date().toLocaleString()})
  var goods = req.body.goods;
    try {
        var result = await order.save()
        try {
            var les = await Promise.all(goods.map(e=>{
                return Good.findByIdAndUpdate(e.goodid, {$inc:{amount: -e.count}})
            }))
            res.json({
                code: 200,
                msg: "下单成功"
            });
        } catch (error) {
            res.json({
                code: 500,
                msg: error.message
            }); 
        }
    } catch (error) {
        res.json({
            code: 500,
            msg: error.message
        }); 
    }
})

router.get('/delete', function(req, res){
    Order.findByIdAndRemove(req.query.id,function(err, result){
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

module.exports = router;
