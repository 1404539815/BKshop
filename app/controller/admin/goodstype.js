const BaseController = require('./base');
class GoodsTypeController extends BaseController{
    //增加商品类型
    async add(){
        await this.ctx.render('admin/goodstype/add')
    }

    //增加商品类型操作
    async doAdd(){
        var body = this.ctx.request.body
        var attrString = body.attr_group;
        var attr_group = attrString.split('\r\n')
        var goodstype = {
            type_name:body.type_name,
            attr_group:attr_group,
        }
        var result = await this.ctx.service.goodstype.insert(goodstype)
        if(result.flag){
            await this.success('/admin/goodstype',result.msg)
        }else{
            await this.fail('/admin/goodstype',result.msg)            
        }
    }

    async list(){
        var result = await this.ctx.service.goodstype.findAll();
        if(result.flag){
            var goodstypes = result.data;
            await this.ctx.render('admin/goodstype/list',{goodstypes})
        }else{
            this.ctx.body = result.msg;
        }
    }

    async edit(){
        var _id = this.ctx.request.query._id;
        var result = await this.ctx.service.goodstype.findById(_id)
        if(result.flag){
            var goodstype = result.data;
            await this.ctx.render('admin/goodstype/edit',{goodstype})
        }else{
            await this.fail('/admin/goodstype',result.msg)
        }
    }

    async doEdit(){
        var body = this.ctx.request.body;
        var _id = body._id;
        var attrGroupString = body.attr_group;
        var attr_group = attrGroupString.trim().split('\r\n')
        var goodstype = {
            type_name:body.type_name,
            attr_group:attr_group,
            type_status:body.type_status
        }
        var result = await this.ctx.service.goodstype.update(_id,goodstype)
        if(result.flag){
            await this.success('/admin/goodstype',result.msg)
        }else{
            await this.fail('/admin/goodstype',result.msg)
        }
        
    }
    async delete(){
        var _id = this.ctx.request.query._id
        var result = await this.ctx.service.goodstype.deleteById(_id)
        if(result.flag){
            await this.success('/admin/goodstype',result.msg)
        }else{
            await this.fail('/admin/goodstype',result.msg)
        }
    }
}
module.exports = GoodsTypeController