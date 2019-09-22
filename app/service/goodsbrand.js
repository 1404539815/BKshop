const {Service} = require('egg');
const fs = require('fs');
class GoodsbrandService extends Service{
    //增加商品品牌
    async insert(fromstream){
        try {
            var body = fromstream.fields;
            if(fromstream&&fromstream.fieldname){
                var filePath = await this.ctx.service.tool.filePath(fromstream.fieldname);
                body.brand_logo =filePath.dbpath;
                await this.ctx.service.tool.uploadFile(fromstream,filePath.targetPath)
                await this.ctx.service.tool.jimp(filePath.targetPath);
            }
            var goodsbrandModel = new this.ctx.model.GoodsBrand(body)
            await goodsbrandModel.save();
            return{flag:true,msg:'增加商品品牌成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'增加商品品牌失败'}
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
                await this.ctx.service.tool.jimp(filePath.targetPath);
                var obj = await this.ctx.model.GoodsBrand.findOne({_id},{_id:0,brand_logo:1});
                var brand_logo = obj.brand_logo;
                if(obj&&obj.brand_logo){
                    var targetPath ='app'+brand_logo
                    var targetPath200 =this.ctx.helper.url200('app'+brand_logo)
                    fs.unlinkSync(targetPath);
                    fs.unlinkSync(targetPath200)
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
                var targetPath200 =this.ctx.helper.url200('app'+brand_logo)
                fs.unlinkSync(targetPath);
                fs.unlinkSync(targetPath200)
            }
            await this.ctx.model.GoodsBrand.deleteOne({_id:_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = GoodsbrandService;