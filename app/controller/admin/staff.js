const BaseController = require('./base');
const fs = require('fs');
const path = require('path'); 
const awaitWriteStream = require('await-stream-ready').write; 
const dateformat = require('dateformat')
const sendToWormhole = require('stream-wormhole')
const mkdirp = require('mkdirp');

class StaffController extends BaseController{
    async add(){
        var object = await this.ctx.service.role.findAll();
          if(object.flag){
            var roles = object.data;
            await this.ctx.render('admin/staff/add',{roles});
          }
    }
    async doAdd(){
        var body = this.ctx.request.body;
        body.login_pwd = await this.ctx.service.tool.md5(body.login_pwd);
        var login_name = body.login_name;
        var user_result = await this.ctx.service.staff.findByLoginName(login_name);
        if(user_result){
          var result = await this.ctx.service.staff.insert(body)
          if(result){
            await this.success('/admin/staff/list','添加用户成功')
          }else{
            await this.fail('/admin/staff/add','添加用户失败')
          }
        }else{
          await this.fail('/admin/staff/add','账户名 已经存在，增加失败')
        }
    }

    async list(){
      var result = await this.ctx.service.staff.findAll();
      if(result.flag){
        var staffs = result.data;
        await this.ctx.render('admin/staff/list',{staffs});
      }  
    }

    async edit(){
      var _id = this.ctx.request.query._id
      var result1 = await this.ctx.service.staff.findById(_id);
      var result2 = await this.ctx.service.role.findAll();
      if(result1.flag&&result2.flag){
        var staff = result1.data;
        var roles = result2.data;
        await this.ctx.render('admin/staff/edit',{staff,roles});
      }else{
        await this.fail('admin/staff/list','数据异常')
      }
    }

    async doEdit(){
      var body = this.ctx.request.body;
      var _id = body._id;
      var pwd = body.login_pwd;

      if(pwd){
        var staff = {
          login_name:body.login_name,
          login_pwd:await this.ctx.service.tool.md5(body.login_pwd),
          staff_name:body.staff_name,
          staff_no:body.staff_no,
          staff_phone:body.staff_phone,
          role_id:body.role_id,        
          staff_status:body.staff_status,
        }
      }else{
        var staff = {
          login_name:body.login_name,
          staff_name:body.staff_name,
          staff_no:body.staff_no,
          staff_phone:body.staff_phone,
          role_id:body.role_id,  
          staff_status:body.staff_status,
        }
      }

      var result = await this.ctx.service.staff.updateById(_id,staff)
      if(result.flag){
        await this.success('/admin/staff/list',result.msg);
      }else{
        await this.fail(this.ctx.locals.lastPage,result.msg)
      }

    }

    async delete(){
      const {ctx} = this;
      var _id = ctx.request.query._id;
      var result = await ctx.service.staff.deleteById(_id)
      if(result){
        await this.success(ctx.locals.lastPage,'删除成功')
      }else{
        await this.fail(ctx.locals.lastPage,'删除失败')
      }
    }

    async upload(){
      await this.ctx.render('admin/staff/headphoto');
    }
    async doUpload(){
      var stream = await this.ctx.getFileStream();
      let uploadBaesDir = this.config.uploadbasedir;
      let dateDir = dateformat(new Date(),'yyyymmdd')
      let baseDir = path.join(uploadBaesDir,dateDir)
      mkdirp(baseDir)
      
      const filename = Date.now()+Math.floor(Math.random()*9000+1000) + 
      path.extname(stream.filename).toLocaleLowerCase();

      var targetPath = path.join(baseDir,filename)

      var writeStream =fs.createWriteStream(targetPath)
      try {
        await awaitWriteStream(stream.pipe(writeStream));        
      } catch (error) {
        await sendToWormhole(stream);
        throw error;
      }
      await this.success(this.ctx.locals.lastPage,'上传成功')
    }
}

module.exports = StaffController;
