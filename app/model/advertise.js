module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema; 
    const AdvertiseSchema = new Schema({
        ads_title:{type:String,default:''}, //广告标题 
        ads_type:{type:String,default:''}, //1 网站 2 app 3 小程序
        ads_img:{type:String,default:''},   //广告图片 
        ads_link:{type:String,default:''},  //跳转地址 
        ads_position:{type:Number,default:0},   //1 上 2 中 3 左 4 右 5 下 
        data_sort:{type:Number,default:10}, //排序 
        data_status:{type:Number,default:1}, //1 显示 2 隐藏
        create_time:{type:Number,default:Date.now()},
    })
    return mongoose.model('Advertise',AdvertiseSchema,'advertises')
}
