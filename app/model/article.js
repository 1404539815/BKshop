module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ArticleSchema = new Schema({
        article_title: { type: String  },   //文章名称
        article_cateid:{type:Schema.Types.ObjectId },   //文章关联id
        article_img: { type: String  },     //文章图片  
        article_link:{type: String },   //文章跳转地址
        article_content: { type: String  },    //文章内容      
        article_keys: { type: String  },    //seo关键词
        article_desc: { type: String },     //seo描述
        data_sort: { type: Number,default:100 },   //排序
        article_status: { type: Number,default:1  },    //状态
        create_time: {type:Number, default: Date.now()},    //创建时间
        data_status:{type:Number,default:1},    //1 正常 0 删除
    });

    return mongoose.model('Article',ArticleSchema,'articles');
  }