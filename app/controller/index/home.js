const {Controller} = require('egg');

class indexController extends Controller{
    async index(){
        const NAV_MIDDLE = 'nav-middle';
        const time = 60*60;
        var navMiddlesResult = await this.ctx.service.cache.get(NAV_MIDDLE);
        if(!navMiddlesResult){
            navMiddlesResult = await this.ctx.service.navigation.findNavPosition(2);
            await this.ctx.service.cache.set(NAV_MIDDLE,navMiddlesResult,time)
        }

        var navMiddlesResult = await this.ctx.service.navigation.findNavPosition(2);
        var navBottomResult = await this.ctx.service.navigation.findNavPosition(3);
        var advertisTopsResult = await this.ctx.service.advertise.findAds(1,3);        
        var advertisSubsResult = await this.ctx.service.advertise.findAds(2,3);        
        var goodsHotResult = await this.ctx.service.goods.findGoodsCondition('is_hot',4); 
        var goodsNewResult = await this.ctx.service.goods.findGoodsCondition('is_new',4);        
        var goodsBestResult = await this.ctx.service.goods.findGoodsCondition('is_best',4);        

        if(navMiddlesResult.flag&&advertisTopsResult&&advertisSubsResult&&goodsHotResult&&goodsBestResult&&goodsBestResult&&navBottomResult){
            var navMiddles = navMiddlesResult.data;
            var navBottoms = navBottomResult.data;
            var advertisTops = advertisTopsResult.data;
            var advertisMiddles = advertisSubsResult.data;
            var goodsHot = goodsHotResult.data;
            var goodsNew = goodsNewResult.data;
            var goodsBest = goodsBestResult.data;
            // console.log(navBottoms);
            
        }
        

        await this.ctx.render('index/index',{navMiddles,advertisTops,advertisMiddles,goodsHot,goodsNew,goodsBest,navBottoms});
    }
}

module.exports = indexController;