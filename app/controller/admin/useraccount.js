const BaseController = require('./base');
class UseraccountController extends BaseController{
    async list(){
        var result = await this.ctx.service.user.findAllAccount();
        if(result.flag){
            var useraccounts = result.data;
            await this.ctx.render('admin/user/listaccount',{useraccounts})
        }else{
            await this.fail('/admin/useraccount/list',result.msg)
        }
    }
    async editAccount(){
        const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.user.findById(_id)
        if(result.flag){
            var useraccount = result.data;
            await this.ctx.render('admin/user/editaccount',{useraccount})
        }else{
            await this.fail('/admin/user/listaccount','访问异常')
        }
    }
    async doEditAccount(){
        const {ctx} = this;
        var body = ctx.request.body;
        var _id = body._id;
        var pwd = body.login_pwd;
        if(pwd){
            var secret = await this.ctx.service.user.findSecret(_id)
            if(secret.flag){
                var secret = secret.data;
                var pwd = await this.ctx.service.tool.md5Secret(pwd,secret)
                var useraccount ={
                    login_name:body.login_name,
                    login_pwd:pwd,
                    user_status:body.user_status
                }
            }else{
                this.ctx.body = result.msg;
            }
            
        }else{
            var useraccount ={
                login_name:body.login_name,
                user_status:body.user_status
            }
        }
        var result = await ctx.service.user.update(_id,useraccount)
        if(result){
            await this.success('/admin/useraccount/list','修改成功')
        }else{
            await this.fail('/admin/useraccount/list','访问异常')
        }
    }
}
module.exports = UseraccountController;