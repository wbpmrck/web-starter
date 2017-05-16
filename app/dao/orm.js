/**
 * Created by kaicui on 16/11/17.
 * 把 orm 框架的一些属性暴露出来
 */

var config = require('config');

var orm = require('koa-orm')(config.db);

module.exports = {
    middleware:orm.middleware, //这个 middleware 用于在koa的处理流程中，往context里注入sequelizejs对象，没什么大用
    db:orm.database().sequelize, //默认的第一个数据库，目前也只有一个库
    models:orm.database().sequelize.models // 默认的第一个数据库里的模型定义
}