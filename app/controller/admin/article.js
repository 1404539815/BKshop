const BaseController = require('./base');
class ArticleController extends BaseController{
    //显示添加文章列表
    async add(){
        var cateResult =await this.ctx.service.articlecategory.findAll();        
        if(cateResult.flag){
            var cates = cateResult.data;
            // console.log(JSON.stringify(cates)+'==========');
            await this.ctx.render('admin/article/add',{cates})
        }
    }
    async doAdd(){
        var fromstream = await this.ctx.getFileStream({requireFile:false});
        var result = await this.ctx.service.article.insert(fromstream)
        if(result.flag){
            await this.success('/admin/article',result.msg)
        }else{
            await this.fail('/admin/article/add',result.msg)            
        }    
    }
    async upload(){
        await this.ctx.render('admin/goods/upload')
    }
    //上传图片
    async doUpload(){
        var parts = await this.ctx.multipart({autoFields:true})
        var result = await this.ctx.service.article.doUpload(parts)
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
        var articlesResult = await this.ctx.service.article.findAll();
        if(articlesResult.flag){
            var articles = articlesResult.data;
            // console.log(JSON.stringify(articles)+'===========');
            await this.ctx.render('admin/article/list',{articles})
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
        var articleResult = await ctx.service.article.findById(_id);
        var catesResult =await this.ctx.service.articlecategory.findAll();   
        if(articleResult.flag&&catesResult.flag){
            var article = articleResult.data;
            var cates = catesResult.data;
            // console.log(article+'==========');
            // console.log(JSON.stringify(cates)+'adasadas');
            await this.ctx.render('admin/article/edit',{article,cates})
        }else{
            await this.fail('/admin/article',result.msg)
        } 
    }
    async doEdit(){
        var fromStream = await this.ctx.getFileStream({requireFile:false});
        var result = await this.ctx.service.article.update(fromStream);        
        if(result.flag){
            await this.success('/admin/article',result.msg)
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
        
    }

    async delete(){
        var _id =await this.ctx.request.query._id;
        
        var result = await this.ctx.service.article.delete(_id)
        if(result){
            await this.success(this.ctx.locals.lastPage,result.msg)            
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
    }
}
module.exports = ArticleController