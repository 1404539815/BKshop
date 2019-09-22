const BaseController = require('./base');
class AdvertiseController extends BaseController{
    //显示添加商品列表
    async add(){         
        await this.ctx.render('admin/advertise/add',)
    }
    async doAdd(){
        var fromstream = await this.ctx.getFileStream({requireFile:false});
        var result = await this.ctx.service.advertise.insert(fromstream)
        if(result.flag){
            await this.success('/admin/advertise',result.msg)
        }else{
            await this.fail('/admin/advertise/add',result.msg)            
        }    
    }
    async upload(){
        await this.ctx.render('admin/goods/upload')
    }
    //上传图片
    async doUpload(){
        var parts = await this.ctx.multipart({autoFields:true})
        var result = await this.ctx.service.goods.doUpload(parts)
        if(result.flag){
            var link = result.data;
            this.ctx.body = {link:link[0]}
            // await this.success('/admin/goods',result.msg)
        }else{
            // await this.fail('/admin/goods/upload',result.msg)            
        }    
    }
    //商品列表
    async list(){
        var result = await this.ctx.service.advertise.findAll();
        if(result.flag){
            var advertises = result.data;
            await this.ctx.render('admin/advertise/list',{advertises})
        }else{
            this.ctx.body = result.msg;
        }
    }
    async getTypeAttrs(){
        var type_id = this.ctx.request.query.type_id;
        var result = await this.ctx.service.goodstypeattr.findAllByTypeId(type_id);
        if(result.flag){
            var data = result.data;
            
            this.ctx.body = {data:data};
        }else{
            this.ctx.body = result.msg;
        }

    }
    async edit(){
        const {ctx} = this
        var _id = ctx.request.query._id;
        var result = await ctx.service.advertise.findById(_id);   
        if(result.flag){
            var advertise = result.data;
            await this.ctx.render('admin/advertise/edit',{advertise})
        }else{
            await this.fail('/admin/advertise',result.msg)
        } 
    }
    async doEdit(){
        var fromStream = await this.ctx.getFileStream({requireFile:false});
        var result = await this.ctx.service.advertise.update(fromStream);        
        if(result.flag){
            await this.success('/admin/advertise',result.msg)
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
        
    }

    async delete(){
        var _id =await this.ctx.request.query._id;
        var result = await this.ctx.service.advertise.deleteById(_id)
        if(result){
            await this.success(this.ctx.locals.lastPage,result.msg)            
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
    }
}
module.exports = AdvertiseController