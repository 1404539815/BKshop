const {Service} = require('egg');
const fs = require('fs');
class AdvertiseService extends Service{
    //增加商品品牌
    async insert(fromstream){
        try {
            var body = fromstream.fields;
            if(fromstream&&fromstream.fieldname){
                var filePath = await this.ctx.service.tool.filePath(fromstream.fieldname);
                body.ads_img =filePath.dbpath;
                await this.ctx.service.tool.uploadFile(fromstream,filePath.targetPath)
                await this.ctx.service.tool.jimp(filePath.targetPath);
            }
            var advertiseModel = new this.ctx.model.Advertise(body)
            await advertiseModel.save();
            return{flag:true,msg:'增加广告成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'增加广告失败'}
        }
    }

    //查询所有商品品牌
    async findAll(){
        try {
            var advertises = await this.ctx.model.Advertise.find({})
            if(advertises){   
                return{flag:true,data:advertises,msg:'查询所有成功'}
            }
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'查询所有失败'}
        }
    }

    //轮播广告
    async findAds(position,limit){
        try {
            var advertises = await this.ctx.model.Advertise.find({ads_position:position,data_status:1}).limit(limit);
            // console.log(advertises);
            
            if(advertises){   
                return{flag:true,data:advertises,msg:'查询所有成功'}
            }
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'查询所有失败'}
        }
    }

    //根据id查询商品品牌
    async findById(_id){
        try {
            var advertise = await this.ctx.model.Advertise.findById(_id)
            if(advertise){
                return{flag:true,data:advertise,msg:'根据id查询成功'}
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
                body.ads_img = filePath.dbpath;
                await this.ctx.service.tool.uploadFile(fromstream,filePath.targetPath)                
                await this.ctx.service.tool.jimp(filePath.targetPath);
                // console.log(filePath.targetPath+'aaaaaa');
                var obj = await this.ctx.model.Advertise.findOne({_id},{_id:0,ads_img:1});
                var ads_img = obj.ads_img;
                if(obj&&obj.ads_img){
                    var targetPath ='app'+ads_img
                    var targetPath200 =this.ctx.helper.url200('app'+ads_img)
                    fs.unlinkSync(targetPath);
                    fs.unlinkSync(targetPath200);
                }
            }
            await this.ctx.model.Advertise.update({_id},body)
            return{flag:true,msg:'更新广告成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'更新广告失败'}
        }
    }

    //根据id删除
    async deleteById(_id){
        try {
            var obj = await this.ctx.model.Advertise.findOne({_id},{_id:0,ads_img:1});
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
            await this.ctx.model.Advertise.deleteOne({_id:_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = AdvertiseService;