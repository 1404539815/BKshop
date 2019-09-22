const BaseController = require('./base');
class GoodsBrandController extends BaseController{
    //增加商品品牌
    async add(){
        await this.ctx.render('admin/goodsbrand/add')
    }

    //增加商品分类操作
    async doAdd(){
        var fromstream = await this.ctx.getFileStream();
        
        var result = await this.ctx.service.goodsbrand.insert(fromstream)
        if(result.flag){
            await this.success('/admin/goodsbrand',result.msg)
        }else{
            await this.fail('/admin/goodsbrand/add',result.msg)            
        }    
    }

    async list(){
        var result = await this.ctx.service.goodsbrand.findAll();
        if(result.flag){
            var goodsbrands = result.data;
            // console.log('goodscategorys===='+JSON.stringify(goodscategorys));
            await this.ctx.render('admin/goodsbrand/list',{goodsbrands})
        }else{
            this.ctx.body = result.msg;
        }
    }

    async edit(){
        var _id = this.ctx.request.query._id;
        var result = await this.ctx.service.goodsbrand.findById(_id);   
        if(result.flag){
            var goodsbrand = result.data;
            
            // console.log(JSON.stringify(goodsbrand)); 
            
            await this.ctx.render('admin/goodsbrand/edit',{goodsbrand})
        }else{
            await this.fail('/admin/goodbrand',result.msg)
        }
    }

    async doEdit(){
        var fromstream = await this.ctx.getFileStream({requireFile:false});
        // console.log(JSON.stringify(fields));
        var result = await this.ctx.service.goodsbrand.update(fromstream)
        if(result.flag){
            await this.success('/admin/goodsbrand',result.msg)
        }else{
            await this.fail('/admin/goodsbrand',result.msg)
        }
        
    }
    async delete(){
        var _id = this.ctx.request.query._id
        var result = await this.ctx.service.goodsbrand.deleteById(_id)
        if(result.flag){
            await this.success('/admin/goodsbrand',result.msg)
        }else{
            await this.fail('/admin/goodsbrand',result.msg)
        }
    }
}
module.exports = GoodsBrandController