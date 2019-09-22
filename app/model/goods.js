module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const GoodsTypeSchema = new Schema({
        category_id:{type:mongoose.ObjectId,requied:true},  //商品分类id
        brand_id:{type:mongoose.ObjectId,requied:true}, //商品品牌id
        type_id:{type:mongoose.ObjectId,requied:true},  //商品类型  
        goods_sn:{type:String,requied:true},    //商品编号
        goods_title:{type:String,requied:true}, //商品名称
        goods_brief:{type:String,default:''},   //商品简介
        goods_desc:{type:String,default:''},    //商品详情描述
        goods_img:{type:String,default:''}, //商品图片  requied:'true'
        goods_keys:{type:String,default:''},    //商品关键词 seo
        goods_weight:{type:Number,default:0},   //商品重量
        goods_unit:{type:String,default:''},    //商品单位
        price_market:{type:Number,requied:true},    //市场价格
        price_selling:{type:Number,requied:true},   //销售价格
        price_promote:{type:Number,default:0},  //促销价格
        stock_number:{type:Number,default:0},   //库存数量
        stock_warn:{type:Number,default:0}, //预警数量
        is_sale:{type:Number,default:0},    //1 上架 0 下架
        is_real:{type:Number,default:0},    //1 实物 0 虚拟
        is_hot:{type:Number,default:0}, //热销 1 是 0 否
        is_best:{type:Number,default:0},    //精品 1 是 0 否
        is_new:{type:Number,default:0}, //新品 1 是 0 否
        is_promote:{type:Number,default:0}, //促销 1 是 0 否
        relate_gallerys:{type:[String],default:[]},   //关联相册 【相册图片地址】
        relate_goods:{type:[String],default:[]}, //关联商品 【goods_id】
        relate_gifts:{type:[String],default:[]}, //关联赠品 【gifs_id】
        relate_parts:{type:[String],default:[]}, //关联配件 【parts_id】
        relate_articles:{type:[String],default:[]},  //关联文章 【article_id】
        attr_value_list:{type:[String],default:[]},   //关联相册 【相册图片地址】
        attr_id_list:{type:[String],default:[]},
        // attr_colors:{type:[String],default:[]},  //属性颜色
        // attr_sizes:{type:[String],default:[]},  //属性尺寸
        // attr_versions:{type:[mongoose.Mixed],default:[]},    //属性版本 {varsion:a,price:20} {varsion:b,price:50}
        // attr_others:{type:[String],default:[]}, //其他属性
        click_number:{type:Number,default:0},   //商品点击数量
        data_status:{type:Number,default:1},    //1 正常 0 删除
        data_sort:{type:Number,default:100},    //排序
        create_time:{type:Number,default:Date.now()},   //创建时间
    })
    return mongoose.model('Goods',GoodsTypeSchema,'goodss');
  }