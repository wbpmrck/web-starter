/**
 * Created by kaicui on 16/11/17.
 * 负责 用户 相关的业务逻辑处理
 */
const logger = require('../log/logger');
const resp = require('../../framework/web/responseHelper');
const { db, models } = require('../dao/orm');
const consts = require('../dao/const/const');
const co = require('co');
const crypto = require('crypto');
const validate = require('../../framework/onelib/OneLib.Validation').targetWrapper;

module.exports = {

    /**
     * 添加系统参数信息
     * @param context
     * @param Category：参数分类
     * @param Key：参数名
     * @param Value：值
     * @param Creator：创建人
     * @returns {*}
     */
    async registUser(context, { accountName, password, nickName, email, phoneNo }) {
        // 参数简单检查
        const validateResult = await validate(accountName, 'accountName').notNull().notEmptyStr()
            .and(password, 'password').notNull().notEmptyStr()
            .run();

        // 如果验证通过
        if (validateResult.pass) {
            // 检查用户是否存在
            const count = await models.SysAccount.count({ where: ['AccountName = ?', accountName] });

            // 如果用户已经存在:
            if (count) {
                return resp.failed({ code: resp.codes.USERNAME_DUMP, desc: `,用户名:${accountName}` });
            }
            // 1.创建salt
            const salt = parseInt(100000 * Math.random(), 10);

            // 2.计算md5
            const hash = crypto.createHash('sha1').update(password + salt, 'utf-8').digest('hex');

            // 3.写入
            const created = await models.SysAccount.create({
                AccountName: accountName,
                AccountPasswordSecret: hash,
                Salt: salt,
                Nickname: nickName,
                Email: email,
                MobilePhoneNo: phoneNo,
            });

            await created.reload();
            if (created) {
                return resp.success({ data: created });
            }
            return resp.failed({ desc: ',写入用户失败' });
        }
        return resp.failed({
            code: resp.codes.PARAM_ILLEGAL,
            desc: `${validateResult.desc}${validateResult.funcDesc}`
        });
    },
    /**
     * 获取系统参数信息
     * @param context
     * @param Category：可选：分类
     * @param Key：可选：参数名
     * @returns {*}
     */
    async login(context, { accountName, password }) {
        // 参数简单检查
        const validateResult = await validate(accountName, 'accountName').notNull().notEmptyStr()
            .and(password, 'password').notNull().notEmptyStr()
            .run();

        // 如果验证通过
        if (validateResult.pass) {
            // 获取用户信息
            const users = await models.SysAccount.findAll({ where: {
                AccountName: accountName
            } });

            // 如果用户存在:
            if (users && users.length > 0) {
                const user = users[0];
                // 计算md5
                const hash = crypto.createHash('sha1').update(password + user.Salt, 'utf-8').digest('hex');

                // 比较加密串
                if (hash === user.AccountPasswordSecret) {
                    return resp.success({ data: user });
                }
                return resp.failed({ code: resp.codes.PASSWORD_WRONG });
            }
            return resp.failed({ code: resp.codes.NO_USER });
        }
        return resp.failed({
            code: resp.codes.PARAM_ILLEGAL,
            desc: `${validateResult.desc}${validateResult.funcDesc}`
        });
    }
};