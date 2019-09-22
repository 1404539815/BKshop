var config = {};


config.keys = '123456';

config.middleware = ['adminauth'];
config.adminauth = {
  enable:true,
  match:'/admin',
};
config.multipart ={
  fields:60,
  fileSize:'30mb'
}

config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

 config.exports = {
    security: {
      csrf: {
        queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
        bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      },
    },
  };

config.mongoose = {
  url: 'mongodb://127.0.0.1:27017/db_buka',
  options: {},
  // mongoose global plugins, expected a function or an array of function and options
};

config.session = {
  key: 'EGG_SESS',
  maxAge: 24 * 3600 * 1000, // 1 天
  httpOnly: true,
  encrypt: true,
}; 

config.uploadbasedir = 'app/public/admin/upload'

  module.exports = config;