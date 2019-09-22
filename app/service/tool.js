const {Service} = require('egg');
const md5 =require('md5');
var svgCaptcha = require('svg-captcha');
const fs = require('fs');
const path = require('path'); 
const awaitWriteStream = require('await-stream-ready').write; 
const dateformat = require('dateformat')
const sendToWormhole = require('stream-wormhole')
const mkdirp = require('mkdirp');
const jimp = require('jimp');

class ToolService extends Service{
    async captcha(width,height,fontSize){
        var w = width?width:100;
        var h = height?height:30;
        var f = fontSize?fontSize:40; 
        var captcha = svgCaptcha.create({
            size:4,
            weight:w,
            height:h,
            fontSize:f,
      });
      return captcha;
    }
    async md5(content){
        return md5(content+"123");
    }
    async md5Secret(content,secret){
        // console.log(content);
        // console.log(secret);
        // console.log(md5(content+secret));        
        return md5(content+secret);
    }
    //生成四位随机数
    async randomNumber(){
        return Math.floor(Math.random() * 9000 + 1000);
    }
    //上传文件重命名
    async filePath(fileName){
        let uploadBaesDir = this.config.uploadbasedir;
        let dateDir = dateformat(new Date(),'yyyymmdd')
        let baseDir = path.join(uploadBaesDir,dateDir)
        mkdirp(baseDir)
        const filename = Date.now()+Math.floor(Math.random()*9000+1000)+ 
        path.extname(fileName).toLocaleLowerCase();
        var targetPath = path.join(baseDir,filename)
        var dbpath = targetPath.slice(3).replace(/\\/g,'/');
        return {targetPath:targetPath,dbpath:dbpath}
    }
    //
    async uploadFile(fromStream,targetPath){
        var writeStream =fs.createWriteStream(targetPath)
        try {
            await awaitWriteStream(fromStream.pipe(writeStream)); 
        } catch (error) {
            await sendToWormhole(fromStream);
            throw error;
        }
    }

    //压缩文件
    async jimp(targetPath){
        jimp.read(targetPath)
        .then(lenna => {
            return lenna
            .resize(256, 256) // resize
            .quality(30) // set JPEG quality
            .write(targetPath+'_200x200'+path.extname(targetPath)); // save
        })
        .catch(err => {
            console.error(err);
        });
    }
    
}
module.exports = ToolService;