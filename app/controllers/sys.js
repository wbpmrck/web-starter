
// const logger = require('../log/logger');
const resp = require('../../framework/web/responseHelper');
const sysService = require('../service/sys');
const consts = require('../dao/const/const');
const co = require('co');


const map = new Map();


map.set(
    // 添加系统参数
    ['POST', '/sys/addSysParam'],
    async function (ctx, next) {
        const self = this;
        try {
            // 从请求中获取参数
            const { Category, Key, Value } = ctx.request.body;
            
            // 从会话中获取登录账户
            const Creator = ctx.getSessionUser().AccountName;
            
            // 调用service获取返回数据
            const result = await sysService.addSysParam(ctx, { Category, Key, Value, Creator });
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);


map.set(
    // 获取系统参数信息
    ['GET', '/sys/getConfig', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            const { Category, Key } = ctx.query;
            // 调用service获取返回数据
            const result = await sysService.getSysParam(ctx, { Category, Key });
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);


module.exports = map;