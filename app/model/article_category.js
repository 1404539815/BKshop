module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ArticleCategorySchema = new Schema({
        acate_title: { type: String ,default:''},   //分类名称
        acate_icon: { type: String,  default:''},   //分类图标
        acate_subtitle: { type: String ,default:'' },/*seo相关的标题  关键词  描述*/
        acate_link:{ type: String ,default:''},     //跳转地址
        acate_pid:{type:Schema.Types.Mixed},     //混合类型  
        acate_keys: { type: String ,default:'' },   //seo关键词     
        acate_desc: { type: String ,default:''},    //seo描述      
        acate_status: { type: Number,default:1  },      
        data_sort: { type: Number,default:100 },
        create_time: { type:Number,default: Date.now()},
        data_status:{type:Number,default:1},    //1 正常 0 删除
    });

    return mongoose.model('ArticleCategory',ArticleCategorySchema,'article_categorys');
  }