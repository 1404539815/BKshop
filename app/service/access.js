const{Service} = require('egg');
class AccessService extends Service{
    async findModules(){
        try{
            var accessModules = await this.ctx.model.Access.find({access_module_id:"0"});
            return {flag:true,data:accessModules,msg:"模块查询成功"};
        }catch(error){
            return {flag:false,msg:"查询失败"};
        }
    }

    async findById(_id){
        try{
            var access = await this.ctx.model.Access.findById(_id);
            if(access){
                return {flag:true,data:access,msg:"查询成功"}
            }
        }catch(error){
            return {flag:false,msg:"查询失败"};
        }
    }

    async insert(access){
        var accessModel=new this.ctx.model.Access(access)
        try{
            await accessModel.save();
            return {flag:true,msg:"增加权限成功"};
        }catch(error){
            return {flag:false,msg:"增加权限失败"};
        }
    }

    async findAll(){
        try{
            var accesses = await this.ctx.model.Access.aggregate([
                {
                    $lookup:{
                        from:'accesses',
                        localField:'_id',
                        foreignField:'access_module_id',
                        as:'subAccess',}
                },
                {
                    $match:{access_module_id:'0',}
                },
                {
                    $sort:{data_sort:1,}
                },
            ]);
            if(accesses){
                return {flag:true,data:accesses,msg:"查询所有权限成功"};
            }
        }catch(error){
            
            return {flag:false,msg:"查询所有权限失败"};
        }
    }

    async findByRoleId(role_id){
        try {
            var roleAccessArray = await this.ctx.model.RoleAccess.find({role_id:role_id});
            return {flag:true,data:roleAccessArray,msg:"依据角色查询成功"}
        } catch (error) {
            return {flag:false,msg:"数据异常，依据角色id查询失败"}
        }
    }

    async findByUrl(access_url){
        try {
            var access = await this.ctx.model.Access.findOne({access_url:access_url})
            
            
            return {flag:true,data:access,msg:"依据url查询成功"}
        } catch (error) {
            return {flag:false,msg:"数据异常，依据url查询失败"}
        }
    }

    async update(_id,access){
        try{
            await this.ctx.model.Access.update({_id:_id},access);
                return {flag:true,msg:"成功"};
        }catch(error){
            console.log(error);
            
            return {flag:false,msg:"失败"};
        }
    }
    
    async deleteById(_id){
        try {
            await this.ctx.model.Access.deleteOne({_id:_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            return{flag:false,msg:'删除失败'}
        }
    }

    async findAllwithCheck(role_id){
        var result1 = await this.findAll();
        var result2 = await this.findByRoleId(role_id);

        if(result1.flag&&result2.flag){
            var accessArray = result1.data;
            var accessChecked = result2.data; 
            // console.log(accessArray);
            // console.log(accessChecked);
            
            var accessCheckedArray = [];
            accessChecked.forEach(element => {
                accessCheckedArray.push(element.access_id.toString())
            });

            for (const module of accessArray) {
                if(accessCheckedArray.indexOf(module._id.toString())!=-1){
                    module.checked = true;  
                }

                for (const access of module.subAccess) {
                    if(accessCheckedArray.indexOf(access._id.toString())!=-1){
                        access.checked = true;
                    }
                }
            }
            // console.log(JSON.stringify(accessArray)+"aaaaaaaa");
            
            return {flag:true,data:accessArray,msg:'查询所有和选中权限成功'}
        }else{
            return {flag:false,msg:'数据异常'}
        }
    }
}

module.exports = AccessService;