const {Service} = require('egg');
class RoleService extends Service{
    async insert(role){
        var roleModel=new this.ctx.model.Role(role)
        try{
            await roleModel.save();
            return true;
        }catch(error){
            return false;
        }
    }

    async findAll(){
        try{
            var roles = await this.ctx.model.Role.find({});
            if(roles){
                return {flag:true,data:roles}
            }
        }catch(error){
            return {flag:false};
        }
    }

    async findById(_id){
        try{
            var role = await this.ctx.model.Role.findById(_id);
            if(role){
                return {flag:true,data:role}
            }
        }catch(error){
            return {flag:false};
        }
    }
    
    async update(_id,role){
        try{
            await this.ctx.model.Role.update({_id:_id},role);
            return true;
        }catch(error){
            return false;
        }
    }

    async deleteById(_id){
        try{
            await this.ctx.model.Role.deleteOne({_id:_id});
            return true;
        }catch(error){
            return false;
        }
    }

    async insertManyRoleAccess(roleAccessArray,role_id){
        try{
            await this.ctx.model.RoleAccess.deleteMany({role_id:role_id});
            await this.ctx.model.RoleAccess.insertMany(roleAccessArray);
            return {flag:true,msg:'授权成功'};
        }catch(error){
        
            return {flag:false,msg:'授权失败'};
        }
    }

}
module.exports = RoleService;