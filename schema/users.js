/**
 * Created by 狗逼 on 2017/7/20.
 */
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    myphoto: String,
    email: String,
    myname: String,
    yourphoto: String,
    youremail: String,
    yourname: String,
    password: String,
    date: String,
    loginDate: String
});