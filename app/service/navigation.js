const {Service} = require('egg');
class NavigationService extends Service{
    async insert(body){
        var navigationModel=new this.ctx.model.Navigation(body)
        try{
            await navigationModel.save();
            return {flag:true,msg:'增加导航成功'};
        }catch(error){
            return {flag:false,msg:'增加导航失败'};
        }
    }
    async findAllwithPage(page,pageSize){
        try {
            var totalNum = await this.ctx.model.Navigation.find({}).count({});
            
            var totalPages = Math.ceil(totalNum/pageSize);
            if(page>totalPages){
                page = totalPages;
            }
            var navigations = await this.ctx.model.Navigation.find({}).skip((page-1)*pageSize).limit(pageSize)
            if(navigations){  
                return{flag:true,data:{navigations,totalPages,page},msg:'查询所有成功'}
            }
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'查询所有失败'}
        }
    }

    async findAll(){
        try{
            var navigations = await this.ctx.model.Navigation.find({}).sort({data_sort:-1});
            if(navigations){
                return {flag:true,data:navigations}
            }
        }catch(error){
            return {flag:false};
        }
    }

    async findNavPosition(position){
        try{
            var navigations = await this.ctx.model.Navigation.find({nav_position:position,nav_status:1}).sort({data_sort:1});
            // console.log(navigations);   
            
            if(navigations){
                return {flag:true,data:navigations}
            }
        }catch(error){
            return {flag:false};
        }
    }

    async findById(_id){
        try{
            var navigation = await this.ctx.model.Navigation.findById(_id);
            if(navigation){
                return {flag:true,data:navigation}
            }
        }catch(error){
            return {flag:false};
        }
    }
    
    async update(_id,navigation){
        try{
            await this.ctx.model.Navigation.update({_id:_id},navigation);
            return true;
        }catch(error){
            return false;
        }
    }
    

    async deleteById(_id){
        try{
            await this.ctx.model.Navigation.deleteOne({_id:_id});
            return true;
        }catch(error){
            return false;
        }
    }
}
module.exports = NavigationService;