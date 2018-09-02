/**
 * Created by 狗逼 on 2017/7/20.
 */
var express = require('express');
var User = require('../models/User');
var router = express.Router();

var data;
router.use(function(req,res,next){
    data = {
        userInfo: req.userInfo
    };
    next();
});

router.get('/',function(req,res,next){
    res.render('main/index');
});
router.get('/user/login',function(req,res,next){
    res.render('main/login');
});
router.get('/user/register',function(req,res,next){
    res.render('main/register');
});
router.get('/main',function(req,res,next){
    var _id = req.userInfo._id;
    User.findOne({ _id: _id }).then(function (userInfo) {
        data.userInfo = userInfo;
        res.render('main/twopeople',data);
    });
});
router.get('/user/setting',function(req,res,next){
    var _id = req.userInfo._id;
    User.findOne({ _id: _id }).then(function (userInfo) {
        data.userInfo = userInfo;
        res.render('main/setting',data);
    });
});
router.get('/main/story',function(req,res,next){
    var _id = req.userInfo._id;
    User.findOne({ _id: _id }).then(function (userInfo) {
        data.userInfo = userInfo;
        res.render('main/love',data);
    });
});

module.exports = router;