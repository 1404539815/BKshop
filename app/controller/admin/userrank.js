const BaseController = require('./base');
class UserrankController extends BaseController{
    async add(){
        await this.ctx.render('admin/userrank/add')
    }

    async doAdd(){
        const{ctx} = this;
        var body = ctx.request.body;
        var result = await ctx.service.userrank.insert(body);
        if(result.flag){
            await this.success('/admin/userrank/list',result.msg)
        }else{
            await this.fail('/admin/userrank/add',result.msg)
        }
    }

    async list(){
        var result = await this.ctx.service.userrank.findAll();
        if(result.flag){
            var userranks = result.data;
            await this.ctx.render('admin/userrank/list',{userranks})
        }else{
            await this.fail('/admin/userrank/list',result.msg)
        }
    }

    async edit(){
        const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.userrank.findById(_id)
        if(result.flag){
            var userrank = result.data;
            await this.ctx.render('admin/userrank/edit',{userrank})
        }else{
            await this.fail('/admin/userrank/list','访问异常')
        }
    }

    async doEdit(){
        const {ctx} = this;
        var body = ctx.request.body;
        var _id = body._id;
        // if(body.data_status == 'on'){
        //     body.data_status = 1
        // }else{
        //     body.data_status = 0
        // }
        var result = await ctx.service.userrank.update(_id,body)
        if(result){
            await this.success('/admin/userrank/list','修改成功')
        }else{
            await this.fail('/admin/userrank/list','访问异常')
        }
    }

    async delete(){
        const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.userrank.deleteById(_id)
        if(result){
            await this.success(ctx.locals.lastPage,'删除成功')
        }else{
            await this.fail(ctx.locals.lastPage,'访问异常')
        }
    }
}
module.exports = UserrankController;