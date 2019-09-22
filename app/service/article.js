const {Service} = require('egg');
const fs = require('fs');
class ArticleService extends Service{
    //增加商品相册
    async doUpload(parts){
        try {
            var links=[];
            var fromstream;
            while((fromstream=await parts())!=null){
                if(fromstream.filename){
                    // console.log('fromstream.filename==='+JSON.stringify(fromstream.filename));
                    var filePath = await this.ctx.service.tool.filePath(fromstream.fieldname);
                    var targetPath = filePath.targetPath;
                    var dbpath = filePath.dbpath;
                    await this.ctx.service.tool.uploadFile(fromstream,targetPath)
                    links.push(dbpath);
                    // console.log('gallerys======'+gallerys);
                }else{
                    continue;
                }
            }
            // var body = parts.field;
            // body.goods_gallery = gallerys;
            // var goodsModel = new this.ctx.model.Goods(body)
            // await goodsModel.save();
            return{flag:true,data:links,msg:'上传商品相册成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'上传商品相册失败'}
        }
    }

    //增加文章
    async insert(fromstream){
        try {
            var body = fromstream.fields;
            if(fromstream&&fromstream.fieldname){
                var filePath = await this.ctx.service.tool.filePath(fromstream.fieldname);
                body.article_img =filePath.dbpath;
                await this.ctx.service.tool.uploadFile(fromstream,filePath.targetPath)
                await this.ctx.service.tool.jimp(filePath.targetPath);
            }
            var articleModel = new this.ctx.model.Article(body)
            await articleModel.save();
            return{flag:true,msg:'增加广告成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'增加广告失败'}
        }
    }

    //查询所有商品品牌
    async findAll(){
        try {
            var articles = await this.ctx.model.Article.aggregate([
                {
                    $lookup:{
                        from:'article_categorys',
                        localField:'article_cateid',
                        foreignField:'_id',
                        as:'category'
                    }
                },
                {
                    $unwind:"$category"
                }
            ])
            if(articles){   
                return{flag:true,data:articles,msg:'查询所有成功'}
            }
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'查询所有失败'}
        }
    }

    //根据id查询商品品牌
    async findById(_id){
        try {
            var article = await this.ctx.model.Article.findById(_id)
            if(article){
                return{flag:true,data:article,msg:'根据id查询成功'}
            }
        } catch (error) {
            return{flag:false,msg:'根据id查询失败'}
        }
    }

    //根据id更新
    async update(fromstream){
        try {
            var body = fromstream.fields;
            var _id = body._id            
            if(fromstream&&fromstream.fieldname){
                var filePath = await this.ctx.service.tool.filePath(fromstream.fieldname);
                // console.log(JSON.stringify(body)+"aaaaaaaaa");
                var dbpath = filePath.dbpath;
                await this.ctx.service.tool.uploadFile(fromstream,filePath.targetPath)                
                await this.ctx.service.tool.jimp(filePath.targetPath);
                body.article_img = dbpath
                await this.ctx.model.Article.updateOne({_id},body)
                // var obj = await this.ctx.model.Article.findOne({_id},{_id:0,article_img:1});
                // var article_img = obj.article_img;
                // if(obj&&obj.article_img){
                    var targetPath ='app'+body.history_img;
                    var targetPath200 =this.ctx.helper.url200('app'+body.history_img)
                    if(fs.existsSync(targetPath)){
                        fs.unlinkSync(targetPath);
                    }
                    if(fs.existsSync(targetPath200)){
                        fs.unlinkSync(targetPath200);
                    }
                }
            // }
            else{
                await this.ctx.model.Article.updateOne({_id},body)
            }
            return{flag:true,msg:'更新广告成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'更新广告失败'}
        }
    }

    //根据id删除
    async deleteById(_id){
        try {
            var obj = await this.ctx.model.article.findOne({_id},{_id:0,ads_img:1});
            if(obj&&obj.ads_img){
                var ads_img = obj.ads_img;
                var targetPath ='app'+ads_img
                var targetPath200 =this.ctx.helper.url200('app'+ads_img)
                if(fs.existsSync(targetPath)){
                    fs.unlinkSync(targetPath);
                }
                if(fs.existsSync(targetPath200)){
                    fs.unlinkSync(targetPath200);
                }
            }
            await this.ctx.model.article.deleteOne({_id:_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'删除失败'}
        }
    }

    async delete(article_id){
        var result = await this.ctx.model.Article.updateOne({_id:article_id},{data_status:0})
        if(result.ok==1){
            return{flag:true,msg:'删除成功'}
        }else{
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = ArticleService;