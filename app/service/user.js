const {Service} = require('egg');
class UserService extends Service{
    async findAll(){
        try{
            var users = await this.ctx.model.User.find({data_status:1});

            for (const user of users) {
                var score = user.user_totalscore;
                var user_rank = await this.ctx.service.userrank.getUserrankByScore(score);
                user.user_rank = user_rank;
            }
            if(users){
                return {flag:true,data:users,msg:'查询会员成功'}
            }
        }catch(error){
            console.log(error);
            
            return {flag:false,msg:'出现异常'};
        }
    }

    async findById(_id){
        try{
            var user = await this.ctx.model.User.findById(_id);
            if(user){
                return {flag:true,data:user}
            }
        }catch(error){
            return {flag:false};
        }
    }
    
    async update(_id,user){
        try{
            await this.ctx.model.User.update({_id:_id},user);
            return true;
        }catch(error){
            return false;
        }
    }

    async deleteById(_id){
        try{
            await this.ctx.model.User.update({_id:_id},{data_status:0});
            return true;
        }catch(error){
            return false;
        }
    }

    async findAllAccount(){
        try {
            var userAccounts = await this.ctx.model.User.find({data_status:1},
                {login_name:1,login_secret:1,user_name:1,user_email:1,_id:1,last_ip:1,last_time:1,user_status:1})
            return {flag:true,data:userAccounts,msg:'查询所有会员账号成功'}
        } catch (error) {
            return {flag:true,msg:'查询所有会员账号失败'}            
        }
    }

    async findSecret(user_id){
        try{
            var result = await this.ctx.model.User.findOne({_id:user_id},{_id:0,login_secret:1});
            console.log(result+'aaaaaaaaaaaaaaaa');
            
            if(result){
                return {flag:true,data:result.login_secret}
            }
        }catch(error){
            return {flag:false,msg:'异常'};
        }
    }
}
module.exports = UserService;