/**
 * Created by kaicui on 16/11/17.
 * 负责 提供系统参数 相关的业务逻辑处理
 */
const logger = require("../log/logger");
const resp = require("../../framework/web/responseHelper");
const {db,models} = require("../dao/orm");
const consts = require("../dao/const/const");
const co = require("co");

const validate = require("../../framework/onelib/OneLib.Validation").targetWrapper;

module.exports={
    
    /**
     * 添加系统参数信息
     * @param context
     * @param Category：参数分类
     * @param Key：参数名
     * @param Value：值
     * @param Creator：创建人
     * @returns {*}
     */
    async addSysParam(context,{Category,Key,Value,Creator}){
        
        //参数简单检查
        let validateResult = await validate(Category, "Category").notNull().notEmptyStr()
            .and(Key, "Key").notNull().notEmptyStr()
            .and(Value, "Value").notNull().notEmptyStr()
            .and(Creator, "Creator").notNull().notEmptyStr()
            .and([Category,Key], "Category,Key").notExistInTable("SystemParam",["Category","Key"])
            .run();
        
        //如果验证通过
        if (validateResult.pass) {
            let created = await models.SystemParam.create(
                {Category,Key,Value,Creator}
            );
            
            //重新查询对象信息
            await created.reload();
            
            if (created) {
                return resp.success({data: created});
            } else {
                return resp.failed({desc: "添加系统参数失败"});
            }
        } else {
            return resp.failed({
                code: resp.codes.PARAM_ILLEGAL,
                desc: `${validateResult.desc}${validateResult.funcDesc}`
            })
        }
        
    },
    /**
     * 获取系统参数信息
     * @param context
     * @param Category：可选：分类
     * @param Key：可选：参数名
     * @returns {*}
     */
    async getSysParam(context,{Category,Key}){
        let where={};
        
        if(Category!==undefined){
            where.Category=Category;
        }
        if(Key!==undefined){
            where.Key=Key;
        }
        
        let result = await models.SystemParam.findAll({"where":where});
        
        return resp.success({data: result});
    }
}