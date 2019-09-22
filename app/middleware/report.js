module.exports = (options,app) => {
    return async function (ctx, next) {
      var startTime = Date.now();
      app.logger.info("开始时间"+startTime);
      await next();
      var endTime = Date.now();
      app.logger.info("结束时间"+endTime);

      app.logger.info("经历时间"+(endTime-startTime));

    }
  };