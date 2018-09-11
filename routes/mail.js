var express = require('express');
var router = express.Router();

var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
// SMTPサーバーの設定
var transporter = nodemailer.createTransport({
    host: "smtp.muumuu-mail.com",
    port: 465,
//    tls: true,
// webメールのログインアカウント
    auth: {
        user: "info@tmsmusic.tokyo",
        pass: "hash2010"
    }
});

router.get('/mail', function(req, res, next) {
res.render('mail', {
title: 'お問い合わせ',
    });
});

// post =================================
router.post('/mail', function(req, res, next) {
// メール内容の取得
//var types = req.body.type;
var sub = req.body.sub;
var name = req.body.name;
var email = req.body.mail;
var message = req.body.message;

try{
transporter.sendMail({
    from: email,
    // お問い合わせ受け取り先のメールアドレス
    to: "info@tmsmusic.tokyo",
    cc: "matsuo@tms-e.co.jp",
    subject: "タイトル:"+sub,
    html:  "名前:"+name + "<br>" + "email:"+email + "<br>" + "メッセージ:"+ "<br>"+message
    }, function(err){
if(err) return next(err);
    //　完了ページへリダイレクト
    res.redirect('/done');
    });
}catch(err){console.dir(err);}
});//post

// get done =================================
router.get('/done', function(req, res, next) {
res.render('done', {
title: 'お問い合わせを受け付けました。後ほど担当の者よりご連絡させて頂きます。'
});
});

/* GET home page. */

module.exports = router;
