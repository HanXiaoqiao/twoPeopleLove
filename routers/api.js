/**
 * Created by 狗逼 on 2017/7/20.
 */
var express = require('express');
var User = require('../models/User');
var router = express.Router();

var responseData;
router.use(function (req,res,next) {
    responseData = {
        code: 0,
        message : ''
    };
    next();
});

function isEmail(str){
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(str);
}
function isDate(str){
    var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return reg.test(str);
}

router.post('/user/register',function(req,res,next){
    var myphoto = req.body.myphoto;
    var email = req.body.email;
    var myname = req.body.myname;
    var yourphoto = req.body.yourphoto;
    var youremail = req.body.youremail;
    var yourname = req.body.yourname;
    var password = req.body.password;
    var date = req.body.date;
    var loginDate = req.body.loginDate;
    if(email == '' || myname == '' || youremail == '' || yourname == '' || password == '' || date == ''){
        responseData.code = 1;
        responseData.message = '邮箱，昵称，密码，日期不能为空';
        res.json(responseData);
        return;
    }
    if (!isEmail(email) || !isEmail(youremail)){
        responseData.code = 2;
        responseData.message = '邮箱输入格式有误，请重新输入';
        res.json(responseData);
        return;
    }
    if (!isDate(date)){
        responseData.code = 3;
        responseData.message = '时间输入格式有误，正确格式是：2017-07-01';
        res.json(responseData);
        return;
    }
    if(password.length < 6){
        responseData.code = 4;
        responseData.message = '密码不能少于6位';
        res.json(responseData);
        return;
    }

    var user = new User({
        myphoto: myphoto,
        email: email,
        myname: myname,
        yourphoto: yourphoto,
        youremail: youremail,
        yourname:yourname,
        password:password,
        date: date,
        loginDate: loginDate
    });
    user.save();
    responseData.message = '注册成功';
    res.json(responseData);
});

router.post('/user/update',function(req,res,next){
    var myphoto = req.body.myphoto;
    var myname = req.body.myname;
    var mybirth = req.body.mybirth;
    var yourphoto = req.body.yourphoto;
    var yourbirth = req.body.yourbirth;
    var hope = req.body.hope;
    if(myname == '' || mybirth == '' || yourbirth == '' || hope == ''){
        responseData.code = 1;
        responseData.message = '内容不能为空';
        res.json(responseData);
        return;
    }

    var user = new User({
        myphoto: myphoto,
        myname: myname,
        mybirth: mybirth,
        yourphoto: yourphoto,
        yourbirth: yourbirth,
        hope: hope
    });
    user.save();
    responseData.message = '保存成功';
    res.json(responseData);
});

router.post('/user/login',function(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    if(email == '' || password == ''){
        responseData.code = 1;
        responseData.message = '邮箱或密码不能为空';
        res.json(responseData);
        return;
    }

    User.findOne({
        email: email,
        password: password
    }).then(function (userInfo) {
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '邮箱或密码输入有误';
            res.json(responseData);
            return;
        }else{
            responseData.message = '登录成功';
            responseData.userInfo = {
                _id: userInfo._id,
                email: userInfo.email,
                myname: userInfo.myname,
                yourname: userInfo.yourname,
                myphoto: userInfo.myphoto,
                date: userInfo.date,
                loginDate: userInfo.loginDate
            };
             req.cookies.set('userInfo',JSON.stringify({
                _id: userInfo._id
            }));
            res.json(responseData);
            return;
        }
    });
});

router.get('/user/logout',function(req,res,next){
    req.cookies.set('userInfo',null);
    res.json(responseData);
});

module.exports = router;