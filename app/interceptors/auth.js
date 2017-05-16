'use strict';
/**
 * Created by kaicui on 16/11/15.
 * 拦截器:用户登录状态检查
 */

const logger = require('../log/logger');
const resp = require("../../framework/web/responseHelper");

module.exports=async (ctx,next)=>{
    let route = require('../../app/routes').getRouter();
    let req= this.request; // Request 对象
    let session = this.session; // session 对象
    //指定路由不做检查 ,静态文件路由(含.)不做检查
    // if(allowUrl.filter(x=>(req.path.indexOf(x)==0) ).length>0 || req.path.indexOf(".")>-1){
    let matched  =route.match(req.path);

    //判断哪些路由不需要进行登录检查
    if( (matched && matched.length>0 && matched[0].name=='ALLOW_ANONYMOUS' )|| req.path.indexOf(".")>-1){
        logger.debug("指定路由不做检查");
        await next();
    }else if(req.method.toLowerCase()=='options'){
        logger.debug("option 不做后续路由");
    }else{
        logger.debug("检查登录状态");
        if(!session.user){
            //如果是html请求
            if(this.request.headers["accept"].indexOf('text/html')>-1){
                //如果是页面，则重定向
                this.response.redirect('/login');
            }else{
                // 如果是ajax
                resp.failed({code:resp.codes.NOT_LOGIN},this);
            }
        }else{
            await next();
        }
    }
}
