module.exports = app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var UserSchema = new Schema({
        login_name:{type:String,required:true },    //账号
        login_secret:{type:Number,required:true },  //安全码 用于密码加密
        login_pwd:{type:String,required:true },    //密码
        user_type:{type:Number,default:0 },     //0 线上会员 1 线下会员
        user_sex:{type:Number,default:1 },  //0 保密 1 男 2女
        user_name:{type:String,default:'' },    //会员昵称
        user_photo:{type:String,default:'' },   //会员头像
        user_truename:{type:String,default:'' },    //真实姓名
        user_birthday:{type:String,default:'' },    //会员生日
        user_wechat:{type:String,default:'' },  //会员微信号
        user_email:{type:String,default:'' },   //会员邮箱
        user_totalscore:{type:Number,default:0 },   //会员消费总积分
        user_status:{type:Number,default:1 },   //1 正常 0 停用
        user_from:{type:Number,default:1 }, //1 pc 2 app 3 wechat
        last_ip:{type:String,default:'' },  //最后登录ip
        last_time:{type:String,default:'' },    //最后登录时间
        data_status:{type:Number,default:1 },   //1 正常 0 删除
        create_time:{type:Number,default:Date.now()},   //创建时间




    })
    return mongoose.model('User',UserSchema,'users')
}