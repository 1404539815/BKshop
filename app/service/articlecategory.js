const {Service} = require('egg');
class ArticleCategoryService extends Service{
    //增加商品分类
    async insert(articlecategory){
        var articlecategoryModel = new this.ctx.model.ArticleCategory(articlecategory)
        try {
            await articlecategoryModel.save();
            return{flag:true,msg:'增加文章分类成功'}
        } catch (error) {
            return{flag:false,msg:'增加文章分类失败'}
        }
    }

    //查询所有顶级分类
    async findAllTopCates(){
        try {
            var topCates = await this.ctx.model.ArticleCategory.find({acate_pid:'0'});
            return{flag:true,data:topCates,msg:'查询所有等级分类成功'}
        } catch (error) {
            return{flag:false,msg:'查询所有等级分类失败'}
        }
    }



    //查询所有商品分类
    async findAll(){
        try {
            var articlecategorys = await this.ctx.model.ArticleCategory.aggregate([
                {
                    $match:{
                        data_status:1,
                        acate_pid:'0',
                    }
                },
                {
                    $lookup:{
                        from:'article_categorys',
                        localField:'_id',
                        foreignField:'acate_pid',
                        as:'subcates'
                    }
                },
                {
                    $project:{
                        _id:1,
                        acate_title:1,
                        acate_icon:1,
                        acate_subtitle:1,
                        acate_link:1,
                        acate_pid:1,
                        acate_keys:1,
                        acate_desc:1,
                        acate_status:1,
                        data_sort:1,
                        create_time:1,
                        data_status:1,
                        subcates:{
                            $filter:{
                                input:'$subcates',
                                as:'item',
                                cond:{$eq:["$$item.data_status",1]}
                            }
                        }
                    }
                }
            ])
             if(articlecategorys){
                 return{flag:true,data:articlecategorys,msg:'查询所有成功'}
             }
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'查询所有失败'}
        }
    }

    //根据id查询
    async findById(_id){
        try {
            var articlecategory = await this.ctx.model.ArticleCategory.findById(_id)
            if(articlecategory){
                return{flag:true,data:articlecategory,msg:'根据id查询成功'}
            }
        } catch (error) {
            return{flag:false,msg:'根据id查询失败'}
        }
    }

    //根据id更新
    async update(_id,articlecategory){
        try {
            await this.ctx.model.ArticleCategory.update({_id},articlecategory);
            return{flag:true,msg:'更新成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'更新失败'}
        }
    }

    //根据id删除
    async deleteById(_id){
        try {
            var object = await this.ctx.model.ArticleCategory.findOne({_id},{_id:0,acate_pid:1})
            var acate_pid = object.acate_pid
            if(acate_pid=='0'){
                var _id = this.app.mongoose.Types.ObjectId(_id);
                await this.ctx.model.ArticleCategory.updateMany({acate_pid:_id},{data_status:0});
                await this.ctx.model.ArticleCategory.update({_id:_id},{data_status:0});
            }else{
                await this.ctx.model.ArticleCategory.update({_id:_id},{data_status:0});
            }
            
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            console.log(error)
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = ArticleCategoryService;