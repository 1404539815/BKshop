const BaseController = require('./base');
class CommentController extends BaseController{
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
        var page= await this.ctx.request.query.page||1;        
        var pageSize =5;  
        var result = await this.ctx.service.comment.findAllwithPage(page,pageSize);
        // var result = await this.ctx.service.comment.findAll();
        if(result.flag){
            var comments = result.data.comments;
            var totalPages = result.data.totalPages;
            var page = result.data.page;
            await this.ctx.render('admin/comment/list',{comments,totalPages,page})
        }else{
            this.ctx.body = result.msg;
        }
    }

    async insertMany(){
        var comments = [];
        for(let i=0;i<20;i++){
            var comment = {
                comment_type:0,
                comment_object:this.app.mongoose.Types.ObjectId('5d294ed8b2ccde3704771b1c'),
                comment_content:'aaaaaaaaaaaaaa',
                comment_rank:3,
                comment_status:1,
                user_id:this.app.mongoose.Types.ObjectId('5d294ed8b2ccde3704771b1c'),
                user_name:'user'+i,
                user_email:'2019'+i+'@eamil.com',
                user_ip:'127.0.0.'+i,
            }
            comments.push(comment);
        }
        var result = await this.ctx.model.Comment.insertMany(comments);
        this.body =result;
    }

    async detail(){
        var _id =  this.ctx.request.query._id;        
        var page =  this.ctx.request.query.page;
        var comment = await this.ctx.model.Comment.findById(_id);
        await this.ctx.render('/admin/comment/detail',{comment,page})
    }

    async doDetail(){
        var _id =  this.ctx.request.query._id;
        var page =  this.ctx.request.query.page;
        var comment_status = await this.ctx.request.query.status;
        if(comment_status==1){
            comment_status = 0
        }else{
            comment_status = 1
        }
        var result = await this.ctx.model.Comment.update({_id},{comment_status})
        if(result){
            await this.success('/admin/comment?page='+page,result.msg)
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
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
        var page =  this.ctx.request.query.page;
        var result = await this.ctx.service.comment.deleteById(_id)
        if(result.flag){
            await this.success('/admin/comment?page='+page,result.msg)
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
    }
}
module.exports = CommentController