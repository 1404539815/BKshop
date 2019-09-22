module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema; 
    const AccessSchema = new Schema({
        access_type:{type:String,required:true},//节点类型  1、表示模块   2、表示菜单     3、操作 
        access_module:{type:String,default:''},//模块名称
        access_action:{type:String,default:''},//权限操作
        access_url:{type:String,default:''},//权限资源
        access_desc:{type:String,default:''},//权限描述
        access_module_id:{type:mongoose.Mixed},//'0'：顶级模块
        data_sort:{type:Number,default:100},//权限排序
        data_status:{type:Number,default:1},//1：正常 0：删除
        creat_time:{type:Number,default:Date.now()}//创建时间
    })
    return mongoose.model('Access',AccessSchema,'accesses')
}
