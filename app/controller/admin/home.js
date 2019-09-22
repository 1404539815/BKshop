const BaseController = require('./base');
const md5 = require('md5')

class HomeController extends BaseController{
    
    //显示主页
    async index(){
        await this.ctx.render('admin/home/home');
    };

    async welcome(){
        await this.ctx.render('admin/home/welcome');
    };

    
}

module.exports = HomeController;