/**
 * Created by 狗逼 on 2017/7/20.
 */

var mongoose = require('mongoose');
var userSchema = require('../schema/users');

module.exports = mongoose.model('User',userSchema);