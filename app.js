/**
 * Created by 狗逼 on 2017/7/20.
 */
var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookies = require('cookies');
var User = require('./models/User');

var app = express();

//设置静态文件托管
app.use('/public',express.static(__dirname + '/public'));

//配置引擎
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
//方便调试，默认缓存关闭
swig.setDefaults({cache : false});

app.use(bodyParser.urlencoded({
    extended: true
}));
//设置cookies
app.use(function(req,res,next){
    req.cookies = new cookies(req,res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            next();
        }catch(e){
            next();
        }
    }else{
        next();
    }
});

app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


mongoose.connect('mongodb://localhost:27018/twope',function(err){
    if(err){
        console.log('连接数据库失败');
    }else{
        console.log('连接数据库成功！');
        app.listen(8980);
    }
});

module.exports = app;