var config = {};
config.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
  };

config.mongoose = {
    enable: true,
    package: 'egg-mongoose',
  };
//redis
config.redis = {
  enable: true,
  package: 'egg-redis',
  client:{
    port:6379,
    host:'127.0.0.1',
    db:0,
    password:'',
  },
};

  module.exports = config;

  