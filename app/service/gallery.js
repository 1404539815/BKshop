const {Service} = require('egg');
const fs = require('fs');
class GalleryService extends Service{
    //增加商品品牌
    async doUpload(parts){
        try {
            var gallerys=[];
            var fromstream;
            while((fromstream=await parts())!=null){
                if(fromstream.filename){
                    // console.log('fromstream.filename==='+JSON.stringify(fromstream.filename));
                    var filePath = await this.ctx.service.tool.filePath(fromstream.fieldname);
                    var targetPath = filePath.targetPath;
                    var dbpath = filePath.dbpath;
                    await this.ctx.service.tool.uploadFile(fromstream,targetPath)
                    gallerys.push(dbpath);
                    // console.log('gallerys======'+gallerys);
                }else{
                    continue;
                }
            }
            var body = parts.field;
            body.goods_gallery = gallerys;
            console.log(JSON.stringify(body)+'aaaaaaaaaaaaaaaaaa');
            
            // var goodsModel = new this.ctx.model.Goods(body)
            // await goodsModel.save();
            return{flag:true,data:gallerys,msg:'增加商品相册成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'增加商品相册失败'}
        }
    }

    //查询所有商品品牌
    async findAll(){
        try {
            var goodsbrands = await this.ctx.model.GoodsBrand.find({})
            if(goodsbrands){   
                return{flag:true,data:goodsbrands,msg:'查询所有成功'}
            }
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'查询所有失败'}
        }
    }

    //根据id查询商品品牌
    async findById(_id){
        try {
            var goodsbrand = await this.ctx.model.GoodsBrand.findById(_id)
            if(goodsbrand){
                return{flag:true,data:goodsbrand,msg:'根据id查询成功'}
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
                body.brand_logo =filePath.dbpath;
                await this.ctx.service.tool.uploadFile(fromstream,filePath.targetPath)
                var obj = await this.ctx.model.GoodsBrand.findOne({_id},{_id:0,brand_logo:1});
                if(obj&&obj.brand_logo){
                    var brand_logo = obj.brand_logo;
                    var targetPath ='app'+brand_logo
                    fs.unlinkSync(targetPath);
                }
            }
            await this.ctx.model.GoodsBrand.update({_id},body)
            return{flag:true,msg:'更新商品品牌成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'更新商品品牌失败'}
        }
    }

    //根据id删除
    async deleteById(_id){
        try {
            var obj = await this.ctx.model.GoodsBrand.findOne({_id},{_id:0,brand_logo:1});
            if(obj&&obj.brand_logo){
                var brand_logo = obj.brand_logo;
                var targetPath ='app'+brand_logo
                fs.unlinkSync(targetPath);
            }
            await this.ctx.model.GoodsBrand.deleteOne({_id:_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = GalleryService;