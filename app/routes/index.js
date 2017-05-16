
const Router 		= require('koa-router'),
    config = require('config');
const glob = require("glob");
const path = require('path');
const logger = require("../log/logger");


var router;
module.exports = {
	getRouter:function () {
		return router;
	},

    /**
     * 自动注册路由
     * @param app
     */
	auto:function (app) {
        logger.info('=====准备自动注册路由======');
        router = new Router({
        	prefix:config.app.domainPrefix
		});
		//遍历下面的js文件，每个都是一个controller.
		//controller文件返回一个Map,key是路由设置，value是路由处理函数
        glob(path.join(__dirname,"../controllers/*.js"), {}, function (er, files) {

            for(let file of files){
                logger.info(`--->正在注册controller:[${file}]`);
                let controllerMapping = require(file);

                for (let [key, value] of controllerMapping.entries()) {
                    let method = key[0].toLowerCase();
                    let pathRule = key[1];
                    logger.info(`-------->注册 action:[${method.toUpperCase()}][${pathRule}]`);
                    if(key[2]){
                        router[method](key[2],pathRule, value)
                    }else{
                        router[method](pathRule, value)
                    }
                }
            }
            logger.info('=====路由注册完毕======');
        })
        app.use(router.middleware());
    }
};