module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    // var d = new Date()
    const RoleSchema = new Schema({
        role_name:{type:String,required:true}, //role 标题
        role_desc:{type:String,default:''}, //role 描述
        create_time:{type:Number,default:Date.now()}, //添加时间
        data_status:{type:Number,default:1}, // 1 : 正常  0 ：删除
    })

  

    return mongoose.model('Role', RoleSchema,'roles');
  }