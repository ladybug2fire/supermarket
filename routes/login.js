var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    res.end('登录成功');
});

module.exports = router;