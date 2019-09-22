const BaseController = require('./base');
class GoodsTypeAttrController extends BaseController{
    //增加商品类型属性
    async add(){
        var type_id = this.ctx.request.query._id;
        var goodstypeResult = await this.ctx.service.goodstype.findById(type_id)
        var goodstypesResult = await this.ctx.service.goodstype.findAll()
        if(goodstypeResult.flag&&goodstypesResult.flag){
            var fromgoodstype = goodstypeResult.data;
            var goodstypes = goodstypesResult.data;
            await this.ctx.render('admin/goodstypeattr/add',{fromgoodstype,goodstypes})
        }else{
            await this.fail('/admin/goodstypeattr','失败')
        }
    }

    //增加商品类型操作
    async doAdd(){
        var body = this.ctx.request.body;
        var type_id = body.type_id;
        // var attrValueArray = body.attr_value.trim().split('\r\n');
        // body.attr_value = attrValueArray;
        var result = await this.ctx.service.goodstypeattr.insert(body)
        if(result.flag){
            await this.success('/admin/goodstypeattr?_id='+type_id,result.msg)
        }else{
            await this.fail('/admin/goodstypeattr/add?_id='+type_id,result.msg)            
        }
    }

    //增加商品类型列表
    async list(){
        var type_id = this.ctx.request.query._id;
        var typeResult = await this.ctx.service.goodstype.findById(type_id);
        var attrsresult = await this.ctx.service.goodstypeattr.findAllByTypeId(type_id);
        // console.log('attrsresult====='+JSON.stringify(attrsresult));
        // console.log('typeresult====='+JSON.stringify(typeResult));

        if(attrsresult.flag&&typeResult.flag){
            var goodstype = typeResult.data;
            var goodstypeattrs = attrsresult.data;
            // console.log(goodstypeattrs);
            await this.ctx.render('admin/goodstypeattr/list',{goodstypeattrs,goodstype})
        }else{
            this.ctx.body = '失败';
        }
    }

    async edit(){
        var attr_id = this.ctx.request.query._id;
        var attrResult = await this.ctx.service.goodstypeattr.findAttrWithType(attr_id)
        var goodstypesResult = await this.ctx.service.goodstype.findAll()        
        if(attrResult.flag&&goodstypesResult.flag){
            var attr = attrResult.data;
            // console.log('attr====='+JSON.stringify(attr));
            var alltypes = goodstypesResult.data;
            // console.log('alltypes====='+alltypes);

            await this.ctx.render('admin/goodstypeattr/edit',{attr,alltypes})
        }else{
            await this.fail('/admin/goodstypeattr','数据异常，显示修改页面失败')
        }
    }

    async doEdit(){
        var body = this.ctx.request.body;
        var type_id = body.type_id;
        var _id = body._id;
        
        var result = await this.ctx.service.goodstypeattr.update(_id,body)
        if(result.flag){
            await this.success('/admin/goodstypeattr?_id='+type_id,result.msg)
        }else{
            await this.fail('/admin/goodstypeattr?_id='+type_id,result.msg)
        }
    }

    async delete(){
        var _id = this.ctx.request.query._id
        var result = await this.ctx.service.goodstypeattr.deleteById(_id)
        if(result.flag){
            await this.success(this.ctx.locals.lastPage,result.msg)
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
    }
}
module.exports = GoodsTypeAttrController