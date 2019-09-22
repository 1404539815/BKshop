const {Service} = require('egg');
class GoodstypeService extends Service{
    //增加类型属性
    async insert(body){
        var goodstypeattrModel = new this.ctx.model.GoodsTypeAttr(body)
        try {
            await goodstypeattrModel.save();
            return{flag:true,msg:'增加商品类型成功'}
        } catch (error) {
            return{flag:false,msg:'增加商品类型失败'}
        }
    }
    //根据type_id查询所有类型属性
    async findAllByTypeId(type_id){
        try {
            var goodstypeattrs = await this.ctx.model.GoodsTypeAttr.find({type_id}).sort({data_sort:1})
             if(goodstypeattrs){
                 
                 return{flag:true,data:goodstypeattrs,msg:'查询所有成功'}
             }
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'根据id查询所有失败'}
        }
    }

    //带有商品类型的属性查询
    async findAttrWithType(attr_id){
        var attr_id = this.app.mongoose.Types.ObjectId(attr_id);
        try {
            var typeAttr = await this.ctx.model.GoodsTypeAttr.aggregate([
                {
                    $lookup:{
                        from:'goods_types',
                        localField:'type_id',
                        foreignField:'_id',
                        as:'goodstype'
                    }
                },
                {
                    $match:{
                        '_id':attr_id
                    }
                },
                // {
                //     $sort:{

                //     }
                // }
            ])
            if(typeAttr){
                return{flag:true,data:typeAttr[0],msg:'属性关联类型查询成功'}
            }
        } catch (error) {
            return{flag:false,msg:'属性关联类型查询失败'}
        }
    }


    //根据id更新
    async update(_id,body){
        try {
            await this.ctx.model.GoodsTypeAttr.update({_id},body);
            return{flag:true,msg:'更新成功'}
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'更新失败'}
        }
    }

    //根据id删除
    async deleteById(_id){
        try {
            await this.ctx.model.GoodsTypeAttr.deleteOne({_id:_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = GoodstypeService;