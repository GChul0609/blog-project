/**
 * Created by lenovo on 2017-03-08.
 */
//检查发表文章
exports.checkLogin = function(req, res, next) {
    if (!req.session.user) {
        //没有登录则转到登录页面
        req.flash('error', '未登录!');
        return res.redirect('/users/login');
    }
    //已经登录则放行
    next();
}

//检查注册
exports.checkNotLogin = function(req, res, next) {
    if (req.session.user) {
        //如果已登录，不能访问注册页面，哪来的回哪去
        req.flash('error', '已登录!');
        return res.redirect('back');//返回之前的页面
    }
    //没登录则放行
    next();
}