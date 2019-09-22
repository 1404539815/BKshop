const BaseController = require('./base');
class GoodsCateGoryController extends BaseController{
    //增加商品分类
    async add(){
        var result =await this.ctx.service.goodscategory.findAllTopCates();
        if(result.flag){
            var topcategorys = result.data;
            
            await this.ctx.render('admin/goodscategory/add',{topcategorys})
        }
    }

    //增加商品分类操作
    async doAdd(){
        var body = this.ctx.request.body
        var cate_pid = body.cate_pid
        if(cate_pid!=0){
            body.cate_pid = this.app.mongoose.Types.ObjectId(cate_pid)
        }
        var result = await this.ctx.service.goodscategory.insert(body)
        if(result.flag){
            await this.success('/admin/goodscategory',result.msg)
        }else{
            await this.fail('/admin/goodscategory',result.msg)            
        }
    }

    async list(){
        var result = await this.ctx.service.goodscategory.findAll();
        if(result.flag){
            var goodscategorys = result.data;
            // console.log('goodscategorys===='+JSON.stringify(goodscategorys));
            await this.ctx.render('admin/goodscategory/list',{goodscategorys})
        }else{
            this.ctx.body = result.msg;
        }
    }

    async edit(){
        var _id = this.ctx.request.query._id;
        var result1 = await this.ctx.service.goodscategory.findById(_id);
        var result2 = await this.ctx.service.goodscategory.findAllTopCates();
        if(result1.flag&&result2.flag){
            var goodscategory = result1.data;
            var topcates = result2.data;
            // console.log('goodscategory====='+JSON.stringify(goodscategory));
            // console.log('topcates=='+topcates);
            await this.ctx.render('admin/goodscategory/edit',{goodscategory,topcates})
        }else{
            await this.fail('/admin/goodscategory',result.msg)
        }
    }

    async doEdit(){
        var body = this.ctx.request.body;
        var _id = body._id;
        var cate_pid = body.cate_pid;
        if(cate_pid!=0){
            body.cate_pid = this.app.mongoose.Types.ObjectId(cate_pid)
        }
        var result = await this.ctx.service.goodscategory.update(_id,body)
        if(result.flag){
            await this.success('/admin/goodscategory',result.msg)
        }else{
            await this.fail('/admin/goodscategory',result.msg)
        }
        
    }
    async delete(){
        var _id = this.ctx.request.query._id
        var result = await this.ctx.service.goodscategory.deleteById(_id)
        if(result.flag){
            await this.success('/admin/goodscategory',result.msg)
        }else{
            await this.fail('/admin/goodscategory',result.msg)
        }
    }
}
module.exports = GoodsCateGoryController