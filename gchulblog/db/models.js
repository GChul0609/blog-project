/**
 * Created by lenovo on 2017-03-07.
 */
//保存的是数据模型，也就是User和Article两张表的结构
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    User:{ //设置User的数据模型:
        username:{type:String,required:true},   //用户名  required:true 必填
        password:{type:String,required:true},   //密码
        email:{type:String,required:true},      //邮箱
        avatar:String     //头像
    },
    Article:{ //设置文章的数据模型:
        user:{type:ObjectId,ref:'User'},        //用户
        title:String,                               //标题
        content:String,                         //内容
        createAt:{type:Date,default:Date.now}  //创建时间
    }
}
