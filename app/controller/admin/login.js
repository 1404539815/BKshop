const BaseController = require('./base');
class LoginController extends BaseController {
  async index() {
    await this.ctx.render('admin/login',{_csrf:this.ctx.csrf})
  };
  async dologin(){
      const {ctx} =this;    
      let username = ctx.request.body.username;
      // let password = await ctx.service.tool.md5Secret(ctx.request.body.password,randomNum);
      let password = await ctx.service.tool.md5(ctx.request.body.password);
      let code = ctx.request.body.code;
      var result = await ctx.service.login.find(username,password,code);
      if(result.flag){
        await this.success('/admin',result.msg);
      }else{
        await this.fail('/admin/login',result.msg);
      }
  };

  async verifyCode(){
    var captcha = await this.ctx.service.tool.captcha(100,35,40);
    this.ctx.session.code = captcha.text;
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data; 
  };
  async logout(){
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;