var express = require('express');
var router = express.Router();
var middleware=require('../middleware/index');

//数据库查询  db.user.find()
//访问登录页面
router.get('/login', function(req, res, next) {
   console.log('打开登录页面');
   res.render('users/login',{title:'登录'});

});
//使用post方式提交登录信息
router.post('/login', function(req, res, next){
    console.log('提交登录信息');
    var user=req.body;
    user.password=md5(user.password);
    //查询数据库，找到是否有匹配的记录
    Model('User').findOne(user,function(err,u){
        if(err){
            req.flash('err','登录失败');
            res.redirect('/users/login');
        }if(u){
            //用户登录成功 将用户的登录信息保存到session中
            req.flash('success','登录成功');
            req.session.user = u;//用户信息存入 session
            res.redirect('/');//注册成功后返回主页
        }else{
            req.flash('error','登录失败');
            res.redirect('/users/login');
        }

    })
});

//打开注册页面
router.get('/reg',middleware.checkNotLogin,function(req,res,next){
    console.log('打开注册页面');
    res.render('users/reg',{title:"注册"});
});

//提交注册信息
router.post('/reg',function(req,res,next){
    //就是 POST 请求信息解析过后的对象，例如我们要访问 POST 来的表单内的 name="username" 域的值，只需访问 req.body['username'] 或 req.body.username 即可。
      var user = req.body;//
    if(user.password != user.repassword){
        req.flash('error','两次输入的密码不一致');
        return res.redirect('/users/reg');
    }
    delete user.repassword; //由于repassword不需要保存，所以可以删除
    user.password = md5(user.password); //对密码进行md5加密
    user.avatar = "http://s.gravatar.com/avatar/"+md5(user.email)+"?s=80"; //得到用户的头像
    new Model('User')(user).save(function(err,user){
        if(err){
            req.flash('error','注册失败');
            return res.redirect('/users/reg');
        }
        req.flash('success','注册成功');
        req.session.user = user;//用户信息存入 session
        res.redirect('/');//注册成功后返回主页
    });

});

//注销用户登录
router.get('/logout',function(req,res,next){
    req.session.user=null;
    req.flash('success','用户登录已注销');
    res.redirect('/');
    console.log('退出登录');
});

function md5(val){
    return require('crypto').createHash('md5').update(val).digest('hex');
}

module.exports = router;
