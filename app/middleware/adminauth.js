module.exports = options=>{
    return async (ctx,next)=>{
        var userinfo = ctx.session.userinfo;
        var pathname = ctx.request.path;
        ctx.locals.lastPage = ctx.request.header.referer
        ctx.locals.csrf = ctx.csrf;
        ctx.locals.userinfo = userinfo;
        // let randomNum = await ctx.service.tool.randomNumber();
        // await ctx.service.tool.md5Secret('123456',randomNum);
        if(userinfo!=null){
            var authresult = await ctx.service.staff.checkAuth(userinfo.role_id,pathname)
            if(authresult.flag){
                var result =await ctx.service.access.findAllwithCheck(userinfo.role_id);
                if(result.flag){
                    ctx.locals.authList = result.data;
                    await next();
                }else{
                    ctx.redirect('/admin/login')
                }
            }else{
                ctx.body = authresult.msg;
            }
            
        }else{
            if(pathname == '/admin/login'||pathname =='/admin/doLogin'||pathname=='/admin/verify'){
            await next();
            }else{
                ctx.redirect('/admin/login');
            }
        }
}
}