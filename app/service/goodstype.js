const {Service} = require('egg');
class GoodstypeService extends Service{
    //增加商品类型
    async insert(goodstype){
        var goodstypeModel = new this.ctx.model.GoodsType(goodstype)
        try {
            await goodstypeModel.save();
            return{flag:true,msg:'增加商品类型成功'}
        } catch (error) {
            return{flag:false,msg:'增加商品类型失败'}
        }
    }
    //查询所有商品类型
    async findAll(){
        try {
            var goodstypes = await this.ctx.model.GoodsType.find({})
             if(goodstypes){
                 
                 return{flag:true,data:goodstypes,msg:'查询所有成功'}
             }
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'查询所有失败'}
        }
    }

    //根据id查询
    async findById(_id){
        try {
            var goodstype = await this.ctx.model.GoodsType.findById(_id)
            if(goodstype){
                return{flag:true,data:goodstype,msg:'根据id查询成功'}
            }
        } catch (error) {
            return{flag:false,msg:'根据id查询失败'}
        }
    }

    //根据id更新
    async update(_id,goodstype){
        try {
            await this.ctx.model.GoodsType.update({_id},goodstype);
            return{flag:true,msg:'更新成功'}
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'更新失败'}
        }
    }

    //根据id删除
    async deleteById(_id){
        try {
            await this.ctx.model.GoodsType.deleteOne({_id:_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = GoodstypeService;