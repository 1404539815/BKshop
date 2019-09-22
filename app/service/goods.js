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
    async insert(fromstream){
        try {
            var body = fromstream.fields;
            //字段处理
            body.relate_goods = body.relate_goods.trim().split(',');
            body.relate_gifts = body.relate_gifts.trim().split(',');
            body.relate_parts = body.relate_parts.trim().split(',');
            body.relate_articles = body.relate_articles.trim().split(',');
            if(fromstream&&fromstream.fieldname){
                var filePath = await this.ctx.service.tool.filePath(fromstream.fieldname);
                await this.ctx.service.tool.uploadFile(fromstream,filePath.targetPath);
                await this.ctx.service.tool.jimp(filePath.targetPath);
                var dbpath = filePath.dbpath;
            }
            body.goods_img =dbpath;
            var goodsModel = new this.ctx.model.Goods(body)
            var result = await goodsModel.save();
            var goods_id = result._id;
            var attr_values = body.attr_value_list;   
            var attr_new_values = [];
            attr_values.forEach(value => {
                var item = value.trim().split('\r\n');
                attr_new_values.push(item);
            });
            var attrArray = body.attr_id_list;
            for (let i = 0; i < attrArray.length; i++) {
                var attr_id = attrArray[i];
                var attr_value = attr_new_values[i];
                var typeAttr = await this.ctx.model.GoodsTypeAttr.findById(attr_id);
                var attr_name = typeAttr.attr_name;
                var type_id = typeAttr.type_id;
                var attr_group = typeAttr.attr_group;
                var attr_type = typeAttr.attr_type;
                var result = await this.ctx.service.goodsattr.insert({
                    attr_id,goods_id,type_id,attr_name,attr_value,attr_group,attr_type
                })
            }
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
            if(page>totalPages){
                page = totalPages;
            }
            var goodss = await this.ctx.model.Goods.find({data_status:1}).skip((page-1)*pageSize).limit(pageSize)
            
            if(goodss){  
                return{flag:true,data:{goodss,totalPages,page},msg:'查询所有成功'}
            }
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'查询所有失败'}
        }
    }

    async findGoodsCondition(condition,number){
        try {
        var json = {data_status:1};
        var limit = number|4
        switch(condition){
            case 'is_hot':
            json = Object.assign(json,{is_hot:1})
            break;
            case 'is_new':
            json = Object.assign(json,{is_new:1})
            break;
            case 'is_best':
            json = Object.assign(json,{is_best:1})
            break;
        }
        var goodss = await this.ctx.model.Goods.find(json).limit(limit)
        // console.log(goodss);
        if(goodss){
            return{flag:true,data:goodss,msg:'根据id查询成功'}   
        } 
        }catch (error) {
            return{flag:false,msg:'根据id查询失败'}
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
    async update(fromstream){
        try {
            var body = fromstream.fields;
            var _id = body._id;
            // console.log(JSON.stringify(body)+'aaaaaaaaaaa');
            //文件上传
            if(fromstream&&fromstream.fieldname){
                var filePath = await this.ctx.service.tool.filePath(fromstream.fieldname);
                var dbpath = filePath.dbpath;
                await this.ctx.service.tool.uploadFile(fromstream,filePath.targetPath);
                await this.ctx.service.tool.jimp(filePath.targetPath);
                body.goods_img =dbpath;  
                await this.ctx.model.Goods.updateOne({_id},body)
                var targetPath = 'app'+body.history_img;
                var targetPath200 = this.ctx.helper.url200('app'+body.history_img)
                // if(obj&&obj.brand_logo){
                //     var targetPath ='app'+brand_logo
                //     var targetPath200 =this.ctx.helper.url200('app'+brand_logo)
                //     fs.unlinkSync(targetPath);
                //     fs.unlinkSync(targetPath200)
                // }
                if(fs.existsSync(targetPath)){
                    fs.unlinkSync(targetPath);
                }
                if(fs.existsSync(targetPath200)){
                    fs.unlinkSync(targetPath200);
                }
            }else{
                    await this.ctx.model.Goods.updateOne({_id},body)                    
                }
            //字段处理
            body.relate_goods = body.relate_goods.trim().split(',');
            body.relate_gifts = body.relate_gifts.trim().split(',');
            body.relate_parts = body.relate_parts.trim().split(',');
            body.relate_articles = body.relate_articles.trim().split(',');
            //处理商品属性
            var attr_values = body.attr_value_list;
            var attr_ids = body.attr_id_list;

            if(typeof(body.attr_value_list=='string')){
                var attr_values = new Array(body.attr_value_list);
                var attr_ids = new Array(body.attr_id_list);
            }
            console.log(attr_values+'=====');
            var attr_new_values = [];
            attr_values.forEach(value => {
                console.log(value+'aaaaaaaa');
                
                var item = value.trim().split('\r\n');
                attr_new_values.push(item);
            });
            var goods_id = body._id;
                //删除商品所有属性
                var result = await this.ctx.service.goodsattr.deleteByGoodsId(goods_id)
                if(result.flag){
                    // var attrArray = body.attr_id_list;
                    // console.log(JSON.stringify(attrArray),'11111111111111111');
                    for (let i = 0; i <attr_ids.length; i++) {
                        var attr_id = attr_ids[i];
                        var attr_value = attr_new_values[i];
                        var typeAttr = await this.ctx.model.GoodsTypeAttr.findById(attr_id);
                        // console.log(JSON.stringify(typeAttr),'===================');
                        var attr_name = typeAttr.attr_name;
                        var type_id = typeAttr.type_id;
                        var attr_group = typeAttr.attr_group;
                        var attr_type = typeAttr.attr_type;
                        var goodsAttrModel = new this.ctx.model.GoodsAttr({
                        attr_id,goods_id,type_id,attr_name,attr_value,attr_group,attr_type
                        })
                    await goodsAttrModel.save();
                    }
                }else{
                    return{flag:false,msg:result.msg}
                }
                return{flag:true,msg:'修改商品成功'}
        } catch (error) {
            console.log(error);
            return{flag:false,msg:'修改商品失败'}
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

            var targetPath ='app'+img_url
            if(fs.existsSync(targetPath)){
                fs.unlinkSync(targetPath);
            }
            if(result.ok==1){
                return{flag:true,msg:'删除相册图片成功'}
            }else{
                return{flag:false,msg:'删除相册图片失败'}            
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }
    async delete(goods_id){
        var result = await this.ctx.model.Goods.updateOne({_id:goods_id},{data_status:0})
        if(result.ok==1){
            return{flag:true,msg:'删除成功'}
        }else{
            return{flag:false,msg:'删除失败'}
        }
    }
}
module.exports = GoodsService;