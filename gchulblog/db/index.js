/**
 * Created by lenovo on 2017-03-07.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');
var settings = require('../settings');

mongoose.connect(settings.url);
mongoose.model('User', new Schema(models.User));
mongoose.model('Article', new Schema(models.Article));

//根据了一个根据名称获得数据模型的方法
global.Model = function (type) {
    return mongoose.model(type);
}
