const BaseController = require('./base');
class NavigationController extends BaseController{
    async add(){
        await this.ctx.render('admin/navigation/add')
    }

    async doAdd(){
        const{ctx} = this;
        var body = ctx.request.body;
        var lastPage = body.lastPage;
        var result = await ctx.service.navigation.insert(body);
        if(result.flag){
            await this.success(lastPage,result.msg)
        }else{
            await this.fail('/admin/navigation/add',result.msg)
        }
    }

    async list(){
        var page= await this.ctx.request.query.page||1;        
        var pageSize =2;  
        var result = await this.ctx.service.navigation.findAllwithPage(page,pageSize);
        if(result.flag){
            var navigations = result.data.navigations;
            var totalPages = result.data.totalPages;
            var page = result.data.page;
            await this.ctx.render('admin/navigation/list',{navigations,totalPages,page})
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
    }

    async edit(){
        const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.navigation.findById(_id)
        if(result.flag){
            var navigation = result.data;            
            await this.ctx.render('admin/navigation/edit',{navigation})
        }else{
            await this.fail('/admin/navigation','访问异常')
        }
    }

    async doEdit(){
        const {ctx} = this;
        var body = ctx.request.body;
        var _id = body._id;
        var lastPage = body.lastPage;
        // if(body.data_status == 'on'){
        //     body.data_status = 1
        // }else{
        //     body.data_status = 0
        // }
        var result = await ctx.service.navigation.update(_id,body)
        if(result){
            await this.success(lastPage,'修改成功')
        }else{
            await this.fail('/admin/navigation/edit','访问异常')
        }
    }

    async delete(){
        const {ctx} = this;
        var _id = ctx.request.query._id;
        var page =  this.ctx.request.query.page;
        var result = await ctx.service.navigation.deleteById(_id)
        if(result){
            await this.success('/admin/navigation?page='+page,'删除成功')
        }else{
            await this.fail(ctx.locals.lastPage,'访问异常')
        }
    }
}
module.exports = NavigationController;