module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    // var d = new Date()
    const RoleAccessSchema = new Schema({
        role_id:{type:mongoose.ObjectId},
        access_id:{type:mongoose.ObjectId}
    });
    return mongoose.model('RoleAccess', RoleAccessSchema,'role_access');
  }