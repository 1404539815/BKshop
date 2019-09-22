module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserrankSchema = new Schema({
        rank_icon:{type:String,default:''},  //等级图标
        rank_name:{type:String,required:true},  //等级名称
        start_score:{type:Number,required:true,default:0},  //开始积分，大于开始积分
        end_score:{type:Number,required:true,default:0},  //结束积分，包含结束积分
        discount:{type:Number,required:true,default:0},  //折扣
        data_sort:{type:Number,default:0},  //排序
        data_status:{type:Number,default:1},  //1：正常 0：删除
        create_time:{type:String,default:Date.now()},  //创建时间

    })

    
    return mongoose.model('Userrank', UserrankSchema,'userranks');
  }