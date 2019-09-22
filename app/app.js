module.exports = app => {
    app.once('server',server => {
      app.logger.info('server is running..');
    });

    app.once('error',(err,ctx) => {
      
    });

    app.once('request',ctx => {
    
    });
    app.on('response',ctx => {
      
    });






  };