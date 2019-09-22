module.exports =app =>{
    app.router.get('/',app.controller.index.home.index);
    app.router.get('/user',app.controller.index.user.User);
}