module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var NavigationSchema = new Schema({
        nav_name:{type:String,default:''},  //导航名称
        nav_icon:{type:String,default:''},  //图标
        nav_position:{type:Number,default:0},  //1 上 2 中 3 下
        nav_open:{type:Number,default:1},  //1 是 2 否
        nav_link:{type:String,default:''},  //导航连接
        data_sort:{type:Number,default:10},  //排序
        nav_status:{type:Number,default:1},  //1 显示 0 隐藏
        create_time:{type:Number,default:Date.now()},  //创建时间
    })
    return mongoose.model('Navigation',NavigationSchema,'navigations')
}