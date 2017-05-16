/**
 * Created by kaicui on 16/11/25.
 * 扩展自定义验证器，用于方便书写代码
 */

var validate = require("../../framework/onelib/OneLib.Validation");
const {db,models} = require("../dao/orm");
//添加一个自定义验证器，验证某个条件的记录在某个表中存在
validate.setValidateFunction("existInTable", {
    fn:function (table,cols, cb) {

        let condition ={};

        //支持对单个项目进行验证，也支持对数组（多列）进行验证
        if(Object.prototype.toString.apply(this.origin) === '[object Array]'){
            for(var i=0;i<this.origin.length;i++){
                condition[cols[i]] = this.origin[i]
            }
        }else{
            condition[cols] = this.origin;
        }

        models[table].count({where:condition}).then(function (count) {
            cb&&cb(count>0);
        }).catch(function (err) {
            cb&&cb(false,err.toString());
        });
    },
    desc:'必须在表{1}中存在' //使用{index}来引用函数的输入参数
});


validate.setValidateFunction("notExistInTable", {
    fn:function (table,cols, cb) {

        let condition ={};

        //支持对单个项目进行验证，也支持对数组（多列）进行验证
        if(Object.prototype.toString.apply(this.origin) === '[object Array]'){
            for(var i=0;i<this.origin.length;i++){
                condition[cols[i]] = this.origin[i]
            }
        }else{
            condition[cols] = this.origin;
        }

        models[table].count({where:condition}).then(function (count) {
            cb&&cb(count==0);
        }).catch(function (err) {
            cb&&cb(false,err.toString());
        });
    },
    desc:'必须不在表{1}中' //使用{index}来引用函数的输入参数
});

