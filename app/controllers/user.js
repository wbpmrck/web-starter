// const logger = require('../log/logger');
const resp = require('../../framework/web/responseHelper');

const userService = require('../service/user');

const map = new Map();


map.set(
    // 用户注册，参数：用户名、密码
    ['POST', '/user/regist', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            // todo:这里也可以通过ctx.orm()拿到访问数据的对象
            // let db = ctx.orm().sequelize,
            //     models = db.models;
            
            const { accountName, password, nickName, email, phoneNo } = ctx.request.body;
            
            // 调用service获取返回数据
            const result = await userService.registUser(ctx, { accountName, password, nickName, email, phoneNo });
            ctx.body = result;
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 用户登录：用户名、密码
    ['POST', '/user/login', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            // 如果已经登录，则直接返回
            if (ctx.hasLogin()) {
                resp.success({ data: ctx.getSessionUser() }, ctx);
            } else {
                const db = ctx.orm().sequelize;
                const models = db.models;
                
                const { accountName, password } = ctx.request.body;
                // const accountName = ctx.params.accountName;
                // const password = ctx.params.password;
                
                // 调用service获取返回数据
                const result = await userService.login(ctx, { accountName, password });
                
                if (result.success) {
                    ctx.setSessionUser(result.data);
                }
                ctx.body = result;
            }
        } catch (e) {
            resp.failed({ desc: e.stack || e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    // 用户取消登录
    ['POST', '/user/logout'],
    async function (ctx, next) {
        const self = this;
        try {
            // 如果已经登录，则直接返回
            if (ctx.hasLogin()) {
                ctx.setSessionUser(undefined);
                resp.success({ data: true }, ctx);
            } else {
                resp.failed({ code: resp.codes.NO_USER }, ctx);
            }
        } catch (e) {
            resp.failed({ desc: e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);

map.set(
    // 获取登录用户信息
    ['GET', '/user/getLoginUser', 'ALLOW_ANONYMOUS'],
    async function (ctx, next) {
        const self = this;
        try {
            resp.success({ data: ctx.getSessionUser() }, ctx);
        } catch (e) {
            resp.failed({ desc: e.toString() }, ctx);
        } finally {
            // 执行流程交给下一个middle-ware
            await next();
        }
    }
);
module.exports = map;