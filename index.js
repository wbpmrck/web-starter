
const logger = require('./app/log/logger');
const path = require('path');
// const spawn = require('child_process').spawn;

const koa = require('koa'),
    views = require('koa-views'),
    config = require('config'),
    serve = require('koa-static');
const session = require('koa-session2');



require("./app/helper/validate-extend"); //这里不能删，通过require实现验证类的注入


// var orm = require('koa-orm')(config.db);
var orm = require('./app/dao/orm');

var app = module.exports = new koa();
/* ---------------------------------
    错误处理
 ---------------------------------*/
process.on('uncaughtException', (err) => {
    console.error(`Caught exception: ${err.stack||err}`);
});

process.on('SIGHUP', () => {
    console.log('server Received SIGHUP.');
});


app.on('error', function(err){
    console.error('server error %s', err.stack||err);
});


/* ---------------------------------
    加载中间件
 ---------------------------------*/


// 1.helpers
app.use(require('./app/interceptors/context-extend'));

// 2.bodyparser
app.use(require('koa-bodyparser')());

// 3.日志
app.use(require('./app/interceptors/logger'));

// 4.session middleware
app.use(session(config.session));

// 6.登录鉴权
app.use(require('./app/interceptors/auth'));

// 7.orm 中间件
app.use(orm.middleware);

// 8.initialize render helper
app.use(views(config.template.path, config.template.options));


/* ---------------------------------
    注册路由
 ---------------------------------*/
// require('./app/routes').regist(app);
require('./app/routes').auto(app);

// 9.static file server
app.use(serve(path.join(__dirname,config.static.path),{defer:true}));



//如果有需要,也可以在action之后添加middleware,但是一般不需要(这里的代码,只有在action里,yield next才会被执行)
// app.use(function *(next) {
//     logger.info("i am test log after action");
// })

if (!module.parent) app.listen(config.server.port);

console.log(`服务已启动，端口:[${config.server.port}]`);