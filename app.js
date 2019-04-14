var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.disable('view cache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('saltfish'));
app.use(session({
    secret: 'saltfish',
    resave: false,
    saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'))
/**
 * 路由拦截
 */
app.use(function(req, res, next){
  if([/users/, /good/, /index/, /order/, /dashboard/, /cash/].some(e=>req.path.match(e))){
    if(req.session.username){
      return next()
    }else{
      return res.redirect('/login')
    }
  }else{
    next();
  }
})
// 路由拦截结束
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/good', require('./routes/good'));
app.use('/cash', require('./routes/cash'));
app.use('/order', require('./routes/order'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// app.listen(8080, () => console.log('Example app listening on port 8080!'))
