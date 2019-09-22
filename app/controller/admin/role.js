const BaseController = require('./base');
class RoleController extends BaseController{
    async add(){
        await this.ctx.render('admin/role/add')
    }

    async doAdd(){
        const{ctx} = this;
        var body = ctx.request.body;
        var role = {
            role_name:body.role_name,
            role_desc:body.role_desc,
        };
        var result = await ctx.service.role.insert(role);
        if(result){
            await this.success('/admin/role/list','添加成功')
        }else{
            await this.fail('/admin/role/add','添加失败')
        }
    }

    async list(){
        //调用service 
                //model ->find({})
        //处理service返回 roles
        //nunjucks 渲染
        var result = await this.ctx.service.role.findAll();
        if(result.flag){
            var roles = result.data;
            await this.ctx.render('admin/role/list',{roles})
        }else{
            await this.fail('/admin/role/list','角色列表数据查询出错')
        }
    }

    async edit(){
        const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.role.findById(_id)
        if(result.flag){
            var role = result.data;
            await this.ctx.render('admin/role/edit',{role})
        }else{
            await this.fail('/admin/role/list','访问异常')
        }
    }

    async doEdit(){
        const {ctx} = this;
        var body = ctx.request.body;
        var _id = body._id;
        if(body.data_status == 'on'){
            body.data_status = 1
        }else{
            body.data_status = 0
        }
        var result = await ctx.service.role.update(_id,body)
        if(result){
            await this.success('/admin/role/list','修改成功')
        }else{
            await this.fail('/admin/role/list','访问异常')
        }
    }

    async delete(){
        const {ctx} = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.role.deleteById(_id)
        if(result){
            await this.success(ctx.locals.lastPage,'删除成功')
        }else{
            await this.fail(ctx.locals.lastPage,'访问异常')
        }
    }

    async auth(){
        const {ctx} = this;
        var role_id = ctx.request.query._id;
        var accessArray = await ctx.service.access.findAllwithCheck(role_id);
        if(accessArray.flag){
            var accessArray = accessArray.data;
            await ctx.render('/admin/role/auth',{accessArray,role_id})
        }else{
            await ctx.fail('/admin/role/list',result.msg)
        }       
    }

    async doAuth(){
        const {ctx} = this;
        var body = ctx.request.body;
        var role_id = body.role_id;
        var role_access_array = [];
        if(body.access_checked){
            var accessCheckedArray = body.access_checked;            
        }else{
            var accessCheckedArray = [];
        }
        console.log(accessCheckedArray);
        accessCheckedArray.forEach(access_id => {
            var roleAccess={
                role_id:role_id,
                access_id:access_id,
            }
            role_access_array.push(roleAccess)
        });
        var result = await ctx.service.role.insertManyRoleAccess(role_access_array,role_id);
        if(result.flag){
            await this.success('/admin/role/list',result.msg)
        }else{
            await this.fail('/admin/role/auth',result.msg)
        }
    }
}
module.exports = RoleController;