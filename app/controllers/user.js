const logger = require("../log/logger");
const resp = require("../../framework/web/responseHelper");
const crypto = require('crypto');

var map = new Map();


map.set(
    //用户注册，参数：用户名、密码
    ["GET","/user/regist/:accountName/:password","ALLOW_ANONYMOUS"],
    async function (ctx,next) {

        var self= this;
        try{

            let db =ctx.orm().sequelize,
                models = db.models;

            let accountName=ctx.params.accountName,
                password = ctx.params.password;

            //检查用户是否存在
            let count = await models.SysAccount.count({ where: ["AccountName = ?", accountName] });

            //如果用户已经存在:
            if(count){
                resp.failed({code:resp.codes.USERNAME_DUMP,desc:",用户名:"+accountName},ctx);
            }else{
                //1.创建salt
                let salt = parseInt(100000* Math.random());

                //2.计算md5
                let hash = crypto.createHash('sha1').update(password+salt,'utf-8').digest('hex');

                //3.写入
                let created = await models.SysAccount.create({
                    AccountName:accountName,
                    AccountPasswordSecret: hash,
                    Salt: salt
                });

                await created.reload();
                if(created){
                    resp.success({data:created},ctx);
                }else{
                    resp.failed({desc:",写入用户失败"},ctx)
                }

            }


        }catch (e){
            resp.failed({desc:e.toString()},ctx);
        }
        finally {
            //执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    //用户登录：用户名、密码
    ["GET","/user/login/:accountName/:password","ALLOW_ANONYMOUS"],
    async function (ctx,next) {
        var self= this;
        try{
            //如果已经登录，则直接返回
            if(ctx.hasLogin()){
                resp.success({data:ctx.getSessionUser()},ctx);
            }else{

                let db =ctx.orm().sequelize,
                    models = db.models;

                let accountName=ctx.params.accountName,
                    password = ctx.params.password;

                //获取用户信息
                let users = await models.SysAccount.findAll({ where: {
                    AccountName:accountName
                } });

                //如果用户存在:
                if(users && users.length>0){

                    let user = users[0];

                    //计算md5
                    let hash = crypto.createHash('sha1').update(password+user.Salt,'utf-8').digest('hex');

                    //比较加密串
                    if(hash === user.AccountPasswordSecret){

                        ctx.setSessionUser(user);

                        resp.success({data:user},ctx);
                    }else{
                        resp.failed({code:resp.codes.PASSWORD_WRONG},ctx);
                    }
                }else{
                    resp.failed({code:resp.codes.NO_USER},ctx);
                }
            }

        }catch (e){
            resp.failed({desc:e.toString()},ctx);
        }
        finally {
            //执行流程交给下一个middle-ware
            await next();
        }
    }
);
map.set(
    //用户取消登录
    ["GET","/user/logout"],
    async function (ctx,next) {
        var self= this;
        try{
            //如果已经登录，则直接返回
            if(ctx.hasLogin()){
                ctx.setSessionUser(undefined);
                resp.success({data:true},ctx);
            }else{
                resp.failed({code:resp.codes.NO_USER},ctx);
            }
        }catch (e){
            resp.failed({desc:e.toString()},ctx);
        }
        finally {
            //执行流程交给下一个middle-ware
            await next();
        }
    }
);

map.set(
    //获取登录用户信息
    ["GET","/user/getLoginUser","ALLOW_ANONYMOUS"],
    async function (ctx,next) {
        var self= this;
        try{
            resp.success({data:ctx.getSessionUser()},ctx);
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