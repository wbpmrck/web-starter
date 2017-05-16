
const logger = require("../log/logger");
const resp = require("../../framework/web/responseHelper");
const sysService = require("../service/sys");
const consts = require("../dao/const/const");
const co = require("co");


var map = new Map();


map.set(
    //添加系统参数
    ["POST","/sys/addSysParam","ALLOW_ANONYMOUS"],
    async function (ctx,next) {

        var self = this;
        try {
            //从请求中获取参数
            let {Category,Key,Value}=ctx.request.body;

            //从会话中获取登录账户
            let Creator =ctx.getSessionUser().AccountName;

            //调用service获取返回数据
            let result = await sysService.addSysParam(self, {Category,Key,Value,Creator});
            ctx.body = result;
        } catch (e) {
            resp.failed({desc: e.toString()}, self);
        }
        finally {
            //执行流程交给下一个middle-ware
            await next();
        }
    }
);


map.set(
    //获取系统参数信息
    ["GET","/sys/getConfig","ALLOW_ANONYMOUS"],
    async function (ctx,next) {
        var self= this;
        try{
            let {Category,Key}=ctx.query;
            //调用service获取返回数据
            let result= await sysService.getSysParam(self,{Category,Key});
            ctx.body = result;

        }catch (e){
            resp.failed({desc:e.toString()},ctx);
        }
        finally {
            //执行流程交给下一个middle-ware
            await next();
        }
    }
);


module.exports=map;

