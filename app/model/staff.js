module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const StaffSchema = new Schema({
        login_name:{type:String,required:true}, //账户
        login_pwd:{type:String,required:true}, //密码
        staff_name:{type:String,required:true}, //职工名称
        staff_no:{type:String,default:''},    //用户编号
        staff_phone:{type:String,default:''},  //用户电话
        staff_status:{type:Number,default:1},  //用户状态 1 正常 0 异常 
        role_id:{type:Schema.Types.ObjectId,required:true},  //角色id 
        data_status:{type:Number,default:1},   // 数据状态 1 正常 0 删除
        create_time:{type:String,default:Date.now()},  // 创建时间
        last_time:{type:String,default:''},    // 最后登录时间
        last_ip:{type:String,default:''},      //访问ip
        is_super:{type:Number,default:0},    //1 超级管理员 0 普通职员
    });

  

    return mongoose.model('Staff', StaffSchema,'staff');
  }