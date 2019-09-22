const {Service} = require('egg');
class UserrankService extends Service{
    async insert(userrank){
        var userrankModel=new this.ctx.model.Userrank(userrank)
        try{
            await userrankModel.save();
            return {flag:true,msg:'增加会员等级成功'};
        }catch(error){
            return {flag:false,msg:'增加会员等级失败'};
        }
    }

    async findAll(){
        try{
            var userranks = await this.ctx.model.Userrank.find({}).sort({data_sort:-1});
            if(userranks){
                return {flag:true,data:userranks}
            }
        }catch(error){
            return {flag:false};
        }
    }

    async findById(_id){
        try{
            var userrank = await this.ctx.model.Userrank.findById(_id);
            if(userrank){
                return {flag:true,data:userrank}
            }
        }catch(error){
            return {flag:false};
        }
    }
    
    async update(_id,userrank){
        try{
            await this.ctx.model.Userrank.update({_id:_id},userrank);
            return true;
        }catch(error){
            return false;
        }
    }

    async deleteById(_id){
        try{
            await this.ctx.model.Userrank.deleteOne({_id:_id});
            return true;
        }catch(error){
            return false;
        }
    }

    async getUserrankByScore(score){
        var userrank = await this.ctx.model.Userrank.findOne({start_score:{$lte:score},end_score:{$gt:score}})
        return userrank.rank_name;
    }
}
module.exports = UserrankService;