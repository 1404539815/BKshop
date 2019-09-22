module.exports = app =>{
    var lowercase = app.middleware.lowercase();
    app.router.get('/api/goods',lowercase,app.controller.api.goods.goodsList);
}