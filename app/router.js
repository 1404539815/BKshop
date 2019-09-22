module.exports = app => {
    require('./router/admin')(app)
    require('./router/index')(app)
    require('./router/api')(app)
  };

