'use strict';
/**
 * Created by kaicui on 16/11/15.
 * 拦截器:用户登录状态检查
 */

const logger = require('../log/logger');
const resp = require("../../framework/web/responseHelper");

module.exports=async (ctx,next)=>{
    let route = require('../../app/routes').getRouter();
    let req= ctx.request; // Request 对象
    let session = ctx.session; // session 对象
    //指定路由不做检查 ,静态文件路由(含.)不做检查
    // if(allowUrl.filter(x=>(req.path.indexOf(x)==0) ).length>0 || req.path.indexOf(".")>-1){
    let matched  =route.match(req.path);

    //判断哪些路由不需要进行登录检查
    if( (matched && matched.path && matched.path.length>0 && matched.path[0].name=='ALLOW_ANONYMOUS' )|| req.path.indexOf(".")>-1){
        logger.debug("指定路由不做检查");
        await next();
    }else{
        logger.debug("检查登录状态");
        if(!session.user){
            //如果是html请求
            if(ctx.request.headers["accept"] && ctx.request.headers["accept"].indexOf('text/html')>-1){
                //如果是页面，则重定向
                ctx.response.redirect('/login');
            }else{
                // 如果是ajax
                resp.failed({code:resp.codes.NOT_LOGIN},ctx);
            }
        }else{
            await next();
        }
    }
}
