const BaseController = require('./base');
class GalleryController extends BaseController{
    //增加商品品牌
    async upload(){
        await this.ctx.render('admin/goods/upload1')
    }

    //增加商品分类操作
    async doUpload(){
        var parts = await this.ctx.multipart({autoFields:true});
        var result = await this.ctx.service.gallery.doUpload(parts)
        if(result.flag){
            var gallerys = result.data;
            // return {msg:gallerys};
            this.ctx.body = {gallerys:gallerys}
            // await this.success('/admin/goodsbrand',result.msg)
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
module.exports = GalleryController