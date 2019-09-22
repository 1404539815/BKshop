module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const GoodsCategorySchema = new Schema({
        cate_name:{type:String,default:''}, //分类名称
        cate_icon:{type:String,default:''}, //分类icon
        cate_keys:{type:String,default:''}, //seo关键字
        cate_desc:{type:String,default:''}, //seo描述
        cate_url:{type:String,default:''},  //跳转地址
        cate_template:{type:String,default:''}, //指定当前分类的模板 跳转不同列表
        cate_pid:{type:Schema.Types.Mixed}, //父类id 0：顶级 其他：上一级objectid
        cate_status:{type:Number,default:1},  //1：显示 0：隐藏
        date_sort:{type:Number,default:50}, //排序
        date_status:{type:Number,default:1},  //1 正常 0删除

    })

    
    return mongoose.model('GoodsCategory',GoodsCategorySchema,'goods_categorys');
  }