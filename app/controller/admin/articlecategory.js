const BaseController = require('./base');
class ArticleCategoryController extends BaseController{
    //增加商品分类
    async add(){
        var result =await this.ctx.service.articlecategory.findAllTopCates();
        if(result.flag){
            var topcategorys = result.data;
            // console.log(topcategorys+'========');

            await this.ctx.render('admin/articlecategory/add',{topcategorys})
        }
    }

    //增加商品分类操作
    async doAdd(){
        var body = this.ctx.request.body
        var acate_pid = body.acate_pid
        if(acate_pid!=0){
            body.acate_pid = this.app.mongoose.Types.ObjectId(acate_pid)
        }
        var result = await this.ctx.service.articlecategory.insert(body)
        if(result.flag){
            await this.success('/admin/articlecategory',result.msg)
        }else{
            await this.fail('/admin/articlecategory',result.msg)            
        }
    }

    async list(){
        var result = await this.ctx.service.articlecategory.findAll();
        if(result.flag){
            var articlecategorys = result.data;
            
            // console.log('articlecategorys===='+JSON.stringify(articlecategorys));
            await this.ctx.render('admin/articlecategory/list',{articlecategorys})
        }else{
            this.ctx.body = result.msg;
        }
    }

    async edit(){
        var _id = this.ctx.request.query._id;
        var result1 = await this.ctx.service.articlecategory.findById(_id);
        var result2 = await this.ctx.service.articlecategory.findAllTopCates();
        if(result1.flag&&result2.flag){
            var articlecategory = result1.data;
            var topcates = result2.data;
            // console.log('articlecategory====='+JSON.stringify(articlecategory));
            // console.log('topcates=='+topcates);
            await this.ctx.render('admin/articlecategory/edit',{articlecategory,topcates})
        }else{
            await this.fail('/admin/articlecategory',result.msg)
        }
    }

    async doEdit(){
        var body = this.ctx.request.body;
        var _id = body._id;
        var acate_pid = body.acate_pid;
        if(acate_pid!=0){
            body.acate_pid = this.app.mongoose.Types.ObjectId(acate_pid)
        }
        var result = await this.ctx.service.articlecategory.update(_id,body)
        if(result.flag){
            await this.success('/admin/articlecategory',result.msg)
        }else{
            await this.fail('/admin/articlecategory',result.msg)
        }
        
    }
    async delete(){
        var _id = this.ctx.request.query._id
        var result = await this.ctx.service.articlecategory.deleteById(_id)
        if(result.flag){
            await this.success('/admin/articlecategory',result.msg)
        }else{
            await this.fail('/admin/articlecategory',result.msg)
        }
    }
}
module.exports = ArticleCategoryController