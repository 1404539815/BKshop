const BaseController = require('./base');
class GoodsController extends BaseController{
    //显示添加商品列表
    async add(){
        const {ctx} = this
        var typeResult = await ctx.service.goodstype.findAll()
        var cateResult = await ctx.service.goodscategory.findAll()
        var brandResult = await ctx.service.goodsbrand.findAll()
        if(typeResult.flag&&cateResult.flag&&brandResult){
            var types = typeResult.data;
            var cates = cateResult.data;
            var brands = brandResult.data;
            // console.log(JSON.stringify(cates)+'==============');
                         
            await this.ctx.render('admin/goods/add',{types,cates,brands})
        }else{
            await this.fail('/admin/goods','显示增加页面失败')
        }
    }
    async doAdd(){
        var fromStream = await this.ctx.getFileStream({requireFile:false});
        var result = await this.ctx.service.goods.insert(fromStream);
        if(result.flag){
            await this.success('/admin/goods',result.msg)
        }else{
            await this.fail('/admin/goods/add',result.msg)
        }
    }
    async upload(){
        await this.ctx.render('admin/goods/upload')
    }
    //上传图片
    async doUpload(){
        var parts = await this.ctx.multipart({autoFields:true})
        var result = await this.ctx.service.goods.doUpload(parts)
        if(result.flag){
            var link = result.data;
            this.ctx.body = {link:link[0]}
            // await this.success('/admin/goods',result.msg)
        }else{
            // await this.fail('/admin/goods/upload',result.msg)            
        }    
    }
    //商品列表
    async list(){
        var page= await this.ctx.request.query.page||1;
        var pageSize =2;  
        var result = await this.ctx.service.goods.findAllwithPage(page,pageSize);
        if(result.flag){
            var goodss = result.data.goodss;
            var totalPages = result.data.totalPages;
            var page = result.data.page;
             
            await this.ctx.render('admin/goods/list',{goodss,totalPages,page})
        }else{
            this.ctx.body = result.msg;
        }
    }
    async getTypeAttrs(){
        var type_id = this.ctx.request.query.type_id;
        var result = await this.ctx.service.goodstypeattr.findAllByTypeId(type_id);
        if(result.flag){
            var data = result.data;
            
            this.ctx.body = {data:data};
        }else{
            this.ctx.body = result.msg;
        }

    }
    async edit(){
        const {ctx} = this
        var _id = ctx.request.query._id;
        var typeResult = await ctx.service.goodstype.findAll()
        var cateResult = await ctx.service.goodscategory.findAll()
        var brandResult = await ctx.service.goodsbrand.findAll()
        var goodsResult = await ctx.service.goods.findById(_id);   
        var goodsstr="";
        var goodsAttrResult = await ctx.service.goodsattr.findByGoodsId(_id);
        var lastPage = this.ctx.locals.lastPage;
        // console.log(JSON.stringify(goodsAttrResult)+'asdasda======');        
        if(goodsAttrResult.flag){
            var goodsAttrs = goodsAttrResult.data;
            // console.log(goodsAttrs+'asdasdsada');
            
            for(var i=0;i<goodsAttrs.length;i++){
                if(goodsAttrs[i].attr_type==1){  //1 唯一属性 2 单选 3复选  
                    goodsstr+='<li><span>'+goodsAttrs[i].attr_name+': </span><input type="hidden" name="attr_id_list" value="'+goodsAttrs[i].attr_id+'" />  <input type="text" name="attr_value_list" value="'+goodsAttrs[i].attr_value+'"/></li>' 
                }else{
                    goodsstr+='<li><span>'+goodsAttrs[i].attr_name+': </span><input type="hidden" name="attr_id_list" value="'+goodsAttrs[i].attr_id+'" />';  
                    goodsstr+='<textarea name="attr_value_list" rows="10" cols="30">';
                    for (const value of goodsAttrs[i].attr_value){
                        goodsstr+=value+'\r\n'
                    }
                    goodsstr+='</textarea>';
                    goodsstr+='</li>';
                }
        } 
        }
             
        if(typeResult.flag&&cateResult.flag&&brandResult&&goodsResult.flag){
            var types = typeResult.data;
            var cates = cateResult.data;
            var brands = brandResult.data;  
            var goods = goodsResult.data;     

            await this.ctx.render('admin/goods/edit',{types,cates,brands,goods,goodsstr,lastPage})
        }else{
            await this.fail('/admin/goods',result.msg)
        }
    }
    async doEdit(){
        var fromStream = await this.ctx.getFileStream({requireFile:false});
        var result = await this.ctx.service.goods.update(fromStream);        
        var lastPage = fromStream.fields.lastPage;
        if(result.flag){
            await this.success(lastPage,result.msg)
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
        
    }
    async deleteImg(){
        var goods_id = this.ctx.request.query._id;
        // console.log(goods_id+'asdasdasda');
        var img_url = this.ctx.request.query.img_url;
        // console.log(img_url+'========');
        var result = await this.ctx.service.goods.deleteImg(goods_id,img_url)
        
        if(result.flag){
            this.ctx.body ={flag:true,msg:result.msg}
        }else{
            this.ctx.body ={flag:false,msg:result.msg}
        }
        
    }
    async delete(){
        var goods_id =await this.ctx.request.query._id;
        var result = await this.ctx.service.goods.delete(goods_id)
        if(result){
            await this.success(this.ctx.locals.lastPage,result.msg)            
        }else{
            await this.fail(this.ctx.locals.lastPage,result.msg)
        }
    }
}
module.exports = GoodsController