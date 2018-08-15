var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sess = require('cookie-session');

// === route
var indexRouter = require('./routes/index');
var express = require('express');
var router = express.Router();
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n-express');
var sess = require('cookie-session');
// route =================================
var index = require('./routes/index');
var mail = require('./routes/mail');
// shop =================================
var shop = require('./routes/shop/index');
var cart = require('./routes/shop/cart');
var item = require('./routes/shop/item');
var his = require('./routes/shop/his');
var my = require('./routes/shop/my');

// === usr
var shop_out = require('./routes/shop/usr/out');
var sig = require('./routes/shop/usr/sig');
var sigp = require('./routes/shop/usr/sigp');
var adr = require('./routes/shop/usr/adr');
var adrp = require('./routes/shop/usr/adrp');
var forget = require('./routes/shop/usr/for');

// === not
var agmt = require('./routes/shop/not/agmt');
var gui = require('./routes/shop/not/gui');
var not = require('./routes/shop/not/not');
// === pal
var pay = require('./routes/shop/pal/pay');
var suc = require('./routes/shop/pal/suc');
var can = require('./routes/shop/pal/can');
var pal_his = require('./routes/shop/pal/his');
// === paidy

var aid = require('./routes/shop/aid/aid');
var paidy = require('./routes/shop/aid/paidy');
var pid = require('./routes/shop/aid/pid');
var cli = require('./routes/shop/aid/cli');

// mer =================================
var mer = require('./routes/mer/index');
var mer_out = require('./routes/mer/out');
var mer_item = require('./routes/mer/item');
var ins = require('./routes/mer/ins');
var ins_fin = require('./routes/mer/ins_fin');
var del = require('./routes/mer/del');
var del_fin = require('./routes/mer/del_fin');
// === song
var song = require('./routes/mer/song');
var song2 = require('./routes/mer/song2');
var song3 = require('./routes/mer/song3');
// === up
var up = require('./routes/mer/up');
var up2 = require('./routes/mer/up2');
var up3 = require('./routes/mer/up3');

//
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// === sess ===
// use =================================
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  sess({
    name: 'sess',
    keys: ['key1'],
    maxAge: 24 * 60 * 1000, // 1 hour
  })
);

app.use('/', indexRouter);
app.use('/', shop);
// i18n ======================================
var nat=["","news","prof","disc","sch","vid","mail","shop"]

for(let i=0;i<nat.length;i++){
app.use(  i18n({    translationsPath: path.join(__dirname, 'i18n/'+nat[i]),
    siteLangs: ['en', 'ja'],    textsVarName: nat[i]  })
);
}
// use route =================================
app.use('/', index);
app.use('/', mail);

// === shop ===
app.use('/', shop);
app.use('/', shop_out);
app.use('/', cart);
app.use('/', gui);
app.use('/', not);

// === paidy ===
app.use('/', paidy);
app.use('/', aid);
app.use('/', pid);
app.use('/', his);
app.use('/', cli);

app.use('/', item);
app.use('/', agmt);

// === pal ===
app.use('/', pay);
app.use('/', suc);
app.use('/', can);
app.use('/', pal_his);

// === mer ===
app.use('/', mer);
app.use('/', mer_out);
app.use('/', mer_item);
app.use('/', ins);
app.use('/', ins_fin);
app.use('/', song);
app.use('/', song2);
app.use('/', song3);
app.use('/', del);
app.use('/', del_fin);
app.use('/', up);
app.use('/', up2);
app.use('/', up3);

//app.use('/', con);
// === login ===
app.use('/', sig);
app.use('/', sigp);
//app.use('/', dre);
app.use('/', adr);
app.use('/', adrp);
app.use('/', forget);
app.use('/', my);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// use route =================================

//app.use(function(req, res, next) {
//var err = new Error('Not Found');
//err.status = 404;
//next(err);
//});

app.use(function(req, res, next) {
  res.status(404).render('404', { title: 'Sorry, page not found' });
});

//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//var ses,usr,title,sku,nam,pri,uni,sum,myerr;

module.exports = app;
