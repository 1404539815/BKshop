const {Controller} = require('egg');
class GoodsController extends Controller{
    async goodsList(){
        let goodsList = [
            {good_name:'a',price:'12'}
        ]
        this.ctx.body = goodsList;
    }
}
module.exports = GoodsController;