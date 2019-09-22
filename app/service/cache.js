const {Service} = require('egg');

class CacheService extends Service{
    //设置缓存
    async set(key,value,time){
        var valueString = JSON.stringify(value);
        //redis key-value 存储
        if(this.app.redis){
            await this.app.redis.set(key,valueString,'EX',time)
        }
    }

    //获取缓存
    async get(key){
        if(this.app.redis){
            var valueString = await this.app.redis.get(key);
            // return JSON.parse(valueString);
        }
    }

    
    
}
module.exports = CacheService;