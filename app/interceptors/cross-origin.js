'use strict';
/**
 * Created by kaicui on 16/11/15.
 * 拦截器:跨域信息输出
 * 如果在index里面使用本拦截器，则允许跨域输出
 */

const logger = require('../log/logger');

module.exports=function *(next){
    //如果启动方式：环境变量里，是支持跨域方式启动
    if(process.env.NODE_DEBUG.indexOf("cross-origin")>-1){
        this.response.set("Access-Control-Allow-Methods","POST,GET,OPTIONS,DELETE");
        this.response.set("Access-Control-Allow-Credentials","true");
        this.response.set("Access-Control-Allow-Origin",this.request.header["origin"]);
        this.response.set("Access-Control-Allow-Headers",'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
    }
    if(this.request.method.toLowerCase()=='options'){
        this.status =200;
    }
    yield next;
}
