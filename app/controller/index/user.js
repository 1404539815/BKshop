const {Controller} = require('egg');

class UserController extends Controller{
    async User(){
        await this.ctx.render('index/user');
    }
}

module.exports = UserController;