const {Service} = require('egg');
const fs = require('fs');
class GoodsService extends Service{
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

    //增加商品
    async insert({attr_id,goods_id,type_id,attr_name,attr_value,attr_group,attr_type}){
        try {
            var goodsAttrModel = new this.ctx.model.GoodsAttr({
                attr_id,goods_id,type_id,attr_name,attr_value,attr_group,attr_type
            })
            await goodsAttrModel.save();
            return{flag:true,msg:'增加商品成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'增加商品失败'}
        }
    }

    //查询所有商品 
    async findAllwithPage(page,pageSize){
        try {
            var totalNum = await this.ctx.model.Goods.find({}).count({data_status:1});
            var totalPages = Math.ceil(totalNum/pageSize);
            var goodss = await this.ctx.model.Goods.find({data_status:1}).skip((page-1)*pageSize).limit(pageSize)
            if(goodss){  
                return{flag:true,data:{goodss,totalPages,page},msg:'查询所有成功'}
            }
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'查询所有失败'}
        }
    }

    //根据id查询商品品牌
    async findById(_id){
        try {
            var goods = await this.ctx.model.Goods.findById(_id)
            if(goods){
                return{flag:true,data:goods,msg:'根据id查询成功'}
            }
        } catch (error) {
            return{flag:false,msg:'根据id查询失败'}
        }
    }

    //根据id更新
    async update(_id,goodsbrand){
        try {
            await this.ctx.model.GoodsBrand.update({_id},goodsbrand);
            return{flag:true,msg:'更新成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'更新失败'}
        }
    }

    //根据id删除
    async deleteById(_id){
        try {
            var obj = await this.ctx.model.GoodsBrand.findOne({_id},{_id:0,brand_logo:1});
            var brand_logo = obj.brand_logo;
            var targetPath ='app'+brand_logo
            fs.unlinkSync(targetPath);
            await this.ctx.model.GoodsBrand.deleteOne({_id:_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'删除失败'}
        }
    }

    async deleteImg(goods_id,img_url){
        try {
            var result = await this.ctx.model.Goods.update({_id:goods_id},{
                $pull:{
                    relate_gallerys:img_url
                }
            })
            if(result.ok==1){
                return{flag:true,msg:'删除相册图片成功'}
            }else{
                return{flag:false,msg:'删除相册图片失败'}            
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }

    async findByGoodsId(_id){
        try {
            var goods_id = this.app.mongoose.Types.ObjectId(_id);

            // console.log(goods_id+'asdasdsdaa');
                        
            var goodsAttrs = await this.ctx.model.GoodsAttr.find({goods_id}).sort({data_sort:1});
            // console.log(goodsAttrs+'===================');
            
            if(goodsAttrs){
                return{flag:true,data:goodsAttrs,msg:'查询成功'}
            }else{
                return{flag:true,data:goodsAttrs,msg:'查询失败'}   
            }
        } catch (error) {
            console.log(error);
        }
    }
    async findById(_id){
        try {
            var goodsAttrs = await this.ctx.model.GoodsAttr.find(_id);
            if(goodsAttrs){
                return {flag:true,data:goodsAttrs,msg:查询成功}
            }else{
                return {flag:true,data:goodsAttrs,msg:查询失败}   
            }
        } catch (error) {
            console.log(error);
        }
    }

    //依据goods_id 删除关联属性
    async deleteByGoodsId(goods_id){
        try {
            await this.ctx.model.GoodsAttr.deleteMany({goods_id});
            return{flag:true,msg:'删除成功'}
        } catch (error) {
            return{flag:false,msg:'删除失败'}        
        }
    }
}
module.exports = GoodsService;