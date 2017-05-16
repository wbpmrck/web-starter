'use strict'
/**
 * Created by kaicui on 16/11/15.
 * 用于对响应进行统一处理
 * 依赖:外部使用的web框架,是使用body存返回数据
 *
 * 格式:
 *
 {
    code:"0000", //0000代表成功
    desc:"成功",
    success:true,
    data:[Object] //返回数据对象

 }
 */
const util = require("util");

const returnCodeDiction= {


    "APP_NOT_EXIST": ["1000", "appId:%s 不存在"], //app 管理相关
    "APP_ALREADY_EXIST": ["1001", "appId:%s 已经存在"],

    "COMPONENT_TYPE_NOT_EXIST": ["2000", "组件类型: %s 不存在"], //组件 管理相关
    "APP_COMPONENT_NOT_EXIST": ["2001", "app组件: %s 不存在"],

    "SDK_NOT_EXIST": ["3001", "SDK: %s 不存在"], //sdk 管理相关

    "ENV_ALREADY_EXIST": ["4001", "环境: %s 已存在"], //环境 管理相关

    "SUCCESS":["0000", "成功%s"],
    "NOT_LOGIN":["0001", "用户未登录%s"],
    "SERVER_ERROR":["0002", "服务错误:%s"],
    "NOT_AUTH": ["0003", "用户没有权限%s"],
    "PARAM_ILLEGAL":["0004", "请求输入参数问题:%s"],
    "USERNAME_DUMP":["0101", "用户名已经存在了%s"],
    "NO_USER":["0102", "用户不存在%s"],
    "PASSWORD_WRONG":["0103", "用户密码错误%s"]
};

/**
 * 创建一个返回对象
 * @param codeAndDesc
 * @param descCustom
 * @param data
 * @returns {{code: *, desc, data: *}}
 * @private
 */
function _makeResponse(codeAndDesc,descCustom,data) {
    let descTemplate = codeAndDesc[1],
        code = codeAndDesc[0];
    let returnDesc = util.format(descTemplate,descCustom);

    return {
        "code":code,
        "desc":returnDesc,
        "data":data
    }
}
module.exports={
    codes:returnCodeDiction,

    /**
     *
     * 处理成功
     * 自动为 httpContext 生成 json 返回
     * 或者直接返回响应对象
     * @param context
     * @param desc
     * @param data
     */
    success:function ({desc="",data=undefined},context) {
        if(context){
            context.body = _makeResponse(returnCodeDiction.SUCCESS,desc,data);
            context.body.success=true;
        }else{
            var dto = _makeResponse(returnCodeDiction.SUCCESS,desc,data);
            dto.success=true;
            return dto;
        }
    },
    /**
     * 处理失败
     * 自动为 httpContext 生成 json 返回
     * 或者直接返回响应对象
     * @param context
     * @param code
     * @param desc
     * @param data
     */
    failed:function ({code=returnCodeDiction.SERVER_ERROR,desc="",data=undefined},context) {
        if(context){
            context.body = _makeResponse(code,desc,data)
            context.body.success=false;
        }else{
            var dto = _makeResponse(code,desc,data)
            dto.success=false;
            return dto;
        }
    }
}
