module.exports = app =>{
    const {router,controller} = app;
    //login
    router.get('/admin/login', controller.admin.login.index);
    router.post('/admin/doLogin', controller.admin.login.dologin);
    router.get('/admin/verify',controller.admin.login.verifyCode);
    router.get('/admin/logout',controller.admin.login.logout);

    //home
    router.get('/admin',controller.admin.home.index);
    router.get('/admin/welcome',controller.admin.home.welcome);

    //Staff
    router.get('/admin/staff/add',controller.admin.staff.add);
    router.post('/admin/staff/doAdd',controller.admin.staff.doAdd);
    router.get('/admin/staff/list',controller.admin.staff.list);
    router.get('/admin/staff/edit',controller.admin.staff.edit);
    router.post('/admin/staff/doEdit',controller.admin.staff.doEdit);
    router.get('/admin/staff/delete',controller.admin.staff.delete);
    router.get('/admin/staff/upload',controller.admin.staff.upload);
    router.post('/admin/staff/doUpload',controller.admin.staff.doUpload);

    //role
    router.get('/admin/role/add',controller.admin.role.add);
    router.post('/admin/role/doAdd',controller.admin.role.doAdd);
    router.get('/admin/role/list',controller.admin.role.list);
    router.get('/admin/role/edit',controller.admin.role.edit);
    router.post('/admin/role/doEdit',controller.admin.role.doEdit);
    router.get('/admin/role/delete',controller.admin.role.delete);
    router.get('/admin/role/auth',controller.admin.role.auth);
    router.post('/admin/role/doAuth',controller.admin.role.doAuth);

    //access
    router.get('/admin/access/add',controller.admin.access.add);
    router.post('/admin/access/doAdd',controller.admin.access.doAdd);
    router.get('/admin/access/list',controller.admin.access.list);
    router.get('/admin/access/edit',controller.admin.access.edit);
    router.post('/admin/access/doEdit',controller.admin.access.doEdit);
    router.get('/admin/access/delete',controller.admin.access.delete);

    //userrank
    router.get('/admin/userrank/list',controller.admin.userrank.list);
    router.get('/admin/userrank/add',controller.admin.userrank.add);
    router.post('/admin/userrank/doAdd',controller.admin.userrank.doAdd);
    router.get('/admin/userrank/edit',controller.admin.userrank.edit);
    router.post('/admin/userrank/doEdit',controller.admin.userrank.doEdit);
    router.get('/admin/userrank/delete',controller.admin.userrank.delete);

    //user
    router.get('/admin/user/list',controller.admin.user.list);
    router.get('/admin/user/edit',controller.admin.user.edit);
    router.post('/admin/user/doEdit',controller.admin.user.doEdit);
    router.get('/admin/user/delete',controller.admin.user.delete);

    //useraccount
    router.get('/admin/useraccount/list',controller.admin.useraccount.list);
    router.get('/admin/useraccount/editAccount',controller.admin.useraccount.editAccount);
    router.post('/admin/useraccount/doEditAccount',controller.admin.useraccount.doEditAccount);
    
    //goods
    router.get('/admin/goodstype',controller.admin.goodstype.list);
    router.get('/admin/goodstype/add',controller.admin.goodstype.add);
    router.post('/admin/goodstype/doAdd',controller.admin.goodstype.doAdd);
    router.get('/admin/goodstype/edit',controller.admin.goodstype.edit);
    router.post('/admin/goodstype/doEdit',controller.admin.goodstype.doEdit);
    router.get('/admin/goodstype/delete',controller.admin.goodstype.delete);

    //商品类型属性
    router.get('/admin/goodstypeattr',controller.admin.goodstypeattr.list);
    router.get('/admin/goodstypeattr/add',controller.admin.goodstypeattr.add);
    router.post('/admin/goodstypeattr/doAdd',controller.admin.goodstypeattr.doAdd);
    router.get('/admin/goodstypeattr/edit',controller.admin.goodstypeattr.edit);
    router.post('/admin/goodstypeattr/doEdit',controller.admin.goodstypeattr.doEdit);
    router.get('/admin/goodstypeattr/delete',controller.admin.goodstypeattr.delete);

    //商品分类
    router.get('/admin/goodscategory',controller.admin.goodscategory.list);
    router.get('/admin/goodscategory/add',controller.admin.goodscategory.add);
    router.post('/admin/goodscategory/doAdd',controller.admin.goodscategory.doAdd);
    router.get('/admin/goodscategory/edit',controller.admin.goodscategory.edit);
    router.post('/admin/goodscategory/doEdit',controller.admin.goodscategory.doEdit);
    router.get('/admin/goodscategory/delete',controller.admin.goodscategory.delete);

    //品牌管理
    router.get('/admin/goodsbrand/add',controller.admin.goodsbrand.add);
    router.post('/admin/goodsbrand/doAdd',controller.admin.goodsbrand.doAdd);
    router.get('/admin/goodsbrand',controller.admin.goodsbrand.list);
    router.get('/admin/goodsbrand/edit',controller.admin.goodsbrand.edit);
    router.post('/admin/goodsbrand/doEdit',controller.admin.goodsbrand.doEdit);
    router.get('/admin/goodsbrand/delete',controller.admin.goodsbrand.delete);

    //商品
    // router.get('/admin/goods/upload',controller.admin.goods.upload);
    router.post('/admin/goods/doUpload',controller.admin.goods.doUpload);
    router.get('/admin/goods/getTypeAttrs',controller.admin.goods.getTypeAttrs);
    router.get('/admin/goods',controller.admin.goods.list);
    router.get('/admin/goods/add',controller.admin.goods.add);
    router.post('/admin/goods/doAdd',controller.admin.goods.doAdd);
    router.get('/admin/goods/edit',controller.admin.goods.edit);
    router.post('/admin/goods/doEdit',controller.admin.goods.doEdit);
    router.get('/admin/goods/deleteImg',controller.admin.goods.deleteImg);
    router.get('/admin/goods/delete',controller.admin.goods.delete);
    router.get('/admin/gallery/upload',controller.admin.gallery.upload);
    router.post('/admin/gallery/doUpload',controller.admin.gallery.doUpload);
    //评论
    router.get('/admin/comment',controller.admin.comment.list);
    router.get('/admin/comment/insertMany',controller.admin.comment.insertMany);
    router.get('/admin/comment/detail',controller.admin.comment.detail);
    router.get('/admin/comment/doDetail',controller.admin.comment.doDetail);
    router.get('/admin/comment/delete',controller.admin.comment.delete);
    //广告
    router.get('/admin/advertise/add',controller.admin.advertise.add);
    router.post('/admin/advertise/doAdd',controller.admin.advertise.doAdd);
    router.get('/admin/advertise',controller.admin.advertise.list);
    router.get('/admin/advertise/edit',controller.admin.advertise.edit);
    router.post('/admin/advertise/doEdit',controller.admin.advertise.doEdit);
    router.get('/admin/advertise/delete',controller.admin.advertise.delete);
    //导航
    router.get('/admin/navigation/add',controller.admin.navigation.add);
    router.post('/admin/navigation/doAdd',controller.admin.navigation.doAdd);
    router.get('/admin/navigation',controller.admin.navigation.list);
    router.get('/admin/navigation/edit',controller.admin.navigation.edit);
    router.post('/admin/navigation/doEdit',controller.admin.navigation.doEdit);
    router.get('/admin/navigation/delete',controller.admin.navigation.delete);
    //内容
    router.get('/admin/articlecategory',controller.admin.articlecategory.list);
    router.get('/admin/articlecategory/add',controller.admin.articlecategory.add);
    router.post('/admin/articlecategory/doAdd',controller.admin.articlecategory.doAdd);
    router.get('/admin/articlecategory/edit',controller.admin.articlecategory.edit);
    router.post('/admin/articlecategory/doEdit',controller.admin.articlecategory.doEdit);
    router.get('/admin/articlecategory/delete',controller.admin.articlecategory.delete);

    router.get('/admin/article',controller.admin.article.list);
    router.get('/admin/article/add',controller.admin.article.add);
    router.post('/admin/article/doUpload',controller.admin.article.doUpload);
    router.post('/admin/article/doAdd',controller.admin.article.doAdd);
    router.get('/admin/article/edit',controller.admin.article.edit);
    router.post('/admin/article/doEdit',controller.admin.article.doEdit);
    router.get('/admin/article/delete',controller.admin.article.delete);


    


    




}