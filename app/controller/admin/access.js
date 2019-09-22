const BaseController = require('./base');
class AccessController extends BaseController{
    async add(){
        var result = await this.ctx.service.access.findModules();
        if(result.flag){
            var modules = result.data;   
            await this.ctx.render('admin/access/add',{modules:modules});
        }else{
            await this.fail('/admin/access/add','模块查询失败');
        }
    }



    async doAdd(){
        var body = this.ctx.request.body;
        var module_id =body.access_module_id;
        if(module_id!='0'){
            body.access_module_id = this.app.mongoose.Types.ObjectId(module_id)
        }
        var result = await this.ctx.service.access.insert(body);
        if(result.flag){
            await this.success('/admin/access/list',result.msg)
        }else{
            await this.fail('/admin/access/add',result.msg)
        }
    }

    async list(){
        var result = await this.ctx.service.access.findAll();
        if(result.flag){
            var accesses =result.data;
            // console.log(JSON.stringify(accesses));
            // console.log();
            
            await this.ctx.render('admin/access/list',{accesses});
        }else{
            await this.fail('/admin/access/list',result.msg)
        }
    }

    async edit(){
        const {ctx} = this;
        var _id = ctx.request.query._id;
        var result1 = await ctx.service.access.findById(_id)
        var result2 = await ctx.service.access.findModules()
        
        if(result1.flag&&result2.flag){
            var access = result1.data;
            var modules = result2.data;
            await ctx.render('admin/access/edit',{access,modules})
        }else{
            if(!result1.flag){
                await this.fail('/admin/access/list',result1.msg)
            }
            if(!result2.flag){
                await this.fail('/admin/access/list',result2.msg)
            }
        }
    }

    async doEdit(){
        var body = this.ctx.request.body;
        var _id = body._id;
        if(body.access_module_id!='0'){
            body.access_module_id = this.app.mongoose.Types.ObjectId(body.access_module_id)
        }
        var result = await this.ctx.service.access.update(_id,body)
        if(result.flag){
            await this.success('/admin/access/list',result.msg);
        }else{
            await this.fail('/admin/access/list',result.msg);
        }
    }

    async delete(){
        var _id = this.ctx.request.query._id;
        var result = await this.ctx.service.access.deleteById(_id)
        if(result.flag){
            await this.success(this.ctx.locals.lastPage,result.msg)
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
    }
}
module.exports = AccessController;