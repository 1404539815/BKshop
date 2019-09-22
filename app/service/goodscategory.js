const {Service} = require('egg');
class GoodscategoryService extends Service{
    //增加商品分类
    async insert(goodscategory){
        var goodscategoryModel = new this.ctx.model.GoodsCategory(goodscategory)
        try {
            await goodscategoryModel.save();
            return{flag:true,msg:'增加商品分类成功'}
        } catch (error) {
            return{flag:false,msg:'增加商品分类失败'}
        }
    }

    //查询所有顶级分类
    async findAllTopCates(){
        try {
            var topCates = await this.ctx.model.GoodsCategory.find({cate_pid:'0'});
            return{flag:true,data:topCates,msg:'查询所有等级分类成功'}
        } catch (error) {
            return{flag:false,msg:'查询所有等级分类失败'}
        }
    }



    //查询所有商品分类
    async findAll(){
        try {
            var goodscategorys = await this.ctx.model.GoodsCategory.aggregate([
                {
                    $match:{
                        date_status:1,
                        cate_pid:'0',
                    }
                },
                {
                    $lookup:{
                        from:'goods_categorys',
                        localField:'_id',
                        foreignField:'cate_pid',
                        as:'subcates'
                    }
                },
                {
                    $project:{
                        _id:1,
                        cate_name:1,
                        cate_icon:1,
                        cate_keys:1,
                        cate_desc:1,
                        cate_url:1,
                        cate_template:1,
                        cate_status:1,
                        date_sort:1,
                        date_status:1,
                        cate_pid:1,
                        subcates:{
                            $filter:{
                                input:'$subcates',
                                as:'item',
                                cond:{$eq:["$$item.date_status",1]}
                            }
                        }
                    }
                }
            ])
             if(goodscategorys){
                
                 return{flag:true,data:goodscategorys,msg:'查询所有成功'}
             }
        } catch (error) {
            console.log(error);
            
            return{flag:false,msg:'查询所有失败'}
        }
    }

    //根据id查询
    async findById(_id){
        try {
            var goodscategory = await this.ctx.model.GoodsCategory.findById(_id)
            if(goodscategory){
                return{flag:true,data:goodscategory,msg:'根据id查询成功'}
            }
        } catch (error) {
            return{flag:false,msg:'根据id查询失败'}
        }
    }

    //根据id更新
    async update(_id,goodscategory){
        try {
            await this.ctx.model.GoodsCategory.update({_id},goodscategory);
            return{flag:true,msg:'更新成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'更新失败'}
        }
    }

    //根据id删除
    async deleteById(_id){
        try {
            var object = await this.ctx.model.GoodsCategory.findOne({_id},{_id:0,cate_pid:1})
            var cate_pid = object.cate_pid
            if(cate_pid=='0'){
                var _id = this.app.mongoose.Types.ObjectId(_id);
                await this.ctx.model.GoodsCategory.updateMany({cate_pid:_id},{date_status:0});
                await this.ctx.model.GoodsCategory.update({_id:_id},{date_status:0});

            }else{
                await this.ctx.model.GoodsCategory.update({_id:_id},{date_status:0});
            }
            
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            console.log(error)
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = GoodscategoryService;