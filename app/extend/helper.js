var dateFormat = require('dateformat');
const path = require('path'); 

module.exports = {
    //时间戳转化 规定格式
    dateFormat(timestamp){

        return dateFormat(new Date(timestamp), "yyyy-mm-dd HH:MM:ss");
    },
    //生成压缩地址
    url200(dbPath){
        return dbPath+'_200x200'+path.extname(dbPath)
    }

}