var express = require('express');
var router = express.Router();

/* GET users listing. */
//访问登录页面
router.get('/login', function(req, res, next) {
    console.log("get方式提交登录信息");
    res.render('users/login',{title:'登录'});
});


//使用post方式提交登录信息
router.post('/login', function(req, res, next) {
    console.log("post方式打开登录页面");
    var user=req.body;
    user.password=md5(user.password);
    //查询数据库，找到是否有匹配的记录
    Model('User').findOne(user,function(err,u){
        if(u){
            //用户登录成功，将用户的登录信息保存到session中
            req.session.user = u;//用户信息存入 session
            return res.redirect('/');//注册成功后返回主页
        }
        //req.flash('error',err);
         res.redirect('/users/login');
    });
});

//打开注册页面
router.get('/reg', function(req, res, next) {
    console.log("get方式打开注册页面");
    res.render('users/reg', {title: '注册'});

});


//提交注册信息
router.post('/reg', function(req, res, next) {
    console.log("post方式提交注册信息");
    //获得用户提交的表单数据
    var user=req.body;
    if(user.password!=user.repassword){
        //密码和确认密码不一致
        //req.flash('error','两次输入的密码不一致');
        //重定向到注册页面
        return res.redirect('/users/reg');  //重定向 redirect get请求
    }
    //删除确认密码的属性
    delete user.repassword;
    //把密码用MD5加密
    user.password = md5(user.password);
    //根据邮箱生成头像地址
    user.avatar = "https://secure.gravatar.com/avatar/"+md5(user.email)+"?s=80";
    //将user对象保存到数据库中  多了一个_id属性
    new Model('User')(user).save(function(err,u){
        if(err){
            //req.flash('error',err);
            return res.redirect('/users/reg');
        }
        req.session.user = u;    //用户登录信息存入 session
        res.redirect('/');          //注册成功后返回主页
    });
});


//注销用户登录
router.get('/logout', function(req, res, next) {
    console.log("get方式注销用户登录");

});


function md5(val){
    return require('crypto').createHash('md5').update(val).digest('hex');
}


module.exports = router;
