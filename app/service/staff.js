const {Service} = require('egg');
class StaffService extends Service{
    async insert(staff){
        var staffModel=new this.ctx.model.Staff(staff)
        try{
            await staffModel.save();
            return true;
        }catch(error){
            return false;
        }
    }

    async find(login_name,login_pwd){
        try {
            var result = await this.ctx.model.Staff.findOne(
                {login_name:login_name,login_pwd:login_pwd},
                {staff_name:1,staff_status:1,_id:0,is_super:1,role_id:1})
                return {flag:true,data:result,msg:"登录成功"}
        } catch (error) {
            return {flag:false,msg:'登录失败'};
        }
        
    }

    async findAll(){
        try{
            var staffs = await this.ctx.model.Staff.aggregate([
                {
                    $lookup:{
                        from:'roles',
                        localField:'role_id',
                        foreignField:'_id',
                        as:'role'
                    }
                }
            ]
            )
            if(staffs){
                return {flag:true,data:staffs}
            }
        }catch(error){
            return {flag:false};
        }
    }

    async findById(_id){
        try{
            var staff = await this.ctx.model.Staff.findById({_id});
            if(staff){
                return {flag:true,data:staff}
            }
        }catch(error){
            return {flag:false};
        }
    }

    async updateById(_id,staff){
        try{
            await this.ctx.model.Staff.updateOne({_id:_id},staff);
                return {flag:true,msg:"成功"};
        }catch(error){
            return {flag:false,msg:"失败"};
        }
    }

    async deleteById(_id){
        try{
            await this.ctx.model.Staff.deleteOne({_id:_id});
            return true;
        }catch(error){
            return false;
        }

    }

    async findByLoginName(login_name){
        var result = await this.ctx.model.Staff.findOne({login_name:login_name});
        if(result){
            return false;
        }else{
            return true;
        }
    }

    async checkAuth(role_id,path){
        var is_super =this.ctx.locals.userinfo.is_super;
        var ignoreUrls = ['/admin/login','/admin/doLogin','/admin/verify','/admin/logout','/admin/welcome','/admin']
        if(ignoreUrls.indexOf(path)!=-1||is_super ==1 ){
            return {flag:true,msg:'访问通过'}
        }

        var resutl1 = await this.ctx.service.access.findByRoleId(role_id)
        var result2 = await this.ctx.service.access.findByUrl(path)
        
        if(resutl1.flag&&result2.flag){
            var accessArray = resutl1.data;
            var access = result2.data;

            var accessAll = [];
            accessArray.forEach(element => {
                accessAll.push(element.access_id.toString())
            });
            if(accessAll.indexOf(access._id.toString())!=-1){
                return {flag:true,msg:'访问通过'}
            }else{
                return {flag:false,msg:'没有访问权限'}
            }
        }
    }
}
module.exports = StaffService;