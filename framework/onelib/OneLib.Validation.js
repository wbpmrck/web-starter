/**功能：
 * 1、提供基本的验证语法框架
 * 2、提供内置的常用验证方法，并且提供扩充验证方法的能力
 *
 * 依赖：
 * 1、OneLib.EventEmitter
 * Created by cuikai on 2015/12/30.
 */

if(typeof module !== 'undefined'){
    define = function (name, deps, factory) {
        module.exports = factory(require,module.exports,module)||module.exports
    }
}

define('OneLib.Validation', [], function (require, exports, module) {

    var event = require("./OneLib.EventEmitter");
    var arrayExt = require("./OneLib.Utils.Array");

    /**
     * 保存内置的常用验证器
     * 可以自定义验证器：
     * 入参：验证参数（选传），回调函数（必传）
     * this:代表被验证的字段：
     *      origin:字段原始值
     *      desc:字段描述
     *      type:typeof 字段
     *      ...(参考 ValidateTarget)
     * @type {{isPhoneNo: Function, isValidCode: Function, isNumber: Function, is: Function}}
     */
    var validateFunctions={
        //是否手机号类型的文本
        isPhoneNoStr:{fn:function (cb) {
            var reg = /^1[0-9]{10}$/;
            cb&&cb(reg.test(this.origin));
        },desc:"必须是合法的手机号格式"},
        //是否数字类型的文本
        isNumStr:{fn:function (lenBegin,lenEnd,cb) {
            //var reg = /^[0-9]{4}$/;
            var reg = new RegExp(['^[0-9]{',lenBegin,',',lenEnd,'}$'].join(''));
            cb&&cb(reg.test(this.origin));
        },desc:"必须是{1}~{2}位数字"},
        //验证是数字类型
        isNum:{fn:function(cb){
            cb&&cb(this.type ==='number' && !isNaN(this.origin))
        },desc:"必须是数字类型"},

        //验证值在给出的范围内
        isOneOf:{fn:function(rangeArray,cb){
            var find = false;
            for(var i=0,j=rangeArray.length;i<j;i++){
                if(rangeArray[i]===this.origin){
                    find=true;
                }
            }
            cb&&cb(find)
        },desc:"必须取集合[{1}]中的值"},


        //验证是字符串
        isStr:{fn:function(cb){
            cb&&cb(this.type ==='string')
        },desc:"必须是字符串"},
        //验证字符非空
        notEmptyStr:{fn:function(cb){
            cb&&cb(this.origin.trim()!=='')
        },desc:"不能为空"},
        //验证输入不含特殊字符(只含有数字、英文、中文、下划线、空格,单引号、双引号、以及逗号、问号、句号的中英文版本)
        noSpecialStr: {fn:function (cb) {
            //var reg =/^[\u4E00-\u9FA5A-Za-z0-9_\x20]+$/;
            var reg =/^[\u4E00-\u9FA5A-Za-z0-9_\x20\u2018\u2019\uff1f\uff0c\u3002\u0027\u0022\u002c\u002e\u003f]+$/;
            cb &&cb(reg.test(this.origin))
        },desc:"不能包含特殊字符"},
        //长度区间。可以使用*表示不限，比如lengthBetween('*',5)相当于<=5
        lengthBetween:{
            fn: function (min, max, cb) {
                min==='*'&& (min=this.origin.length)
                max==='*'&& (max=this.origin.length)
                cb && cb(this.origin.length>=min && this.origin.length<=max)
            },
            //desc:"长度必须在{1}和{2}之间"
            desc:function(min,max){
                if(min==='*'){
                    return "长度必须小于"+max
                }else if(max ==='*'){
                    return "长度必须大于"+min
                }else{
                    return ['长度必须在',min,'和',max,'之间'].join('')
                }
            }
        },
        notNull:{
            fn: function (cb) {
                cb && cb(!this.isNull && !this.isUndefined)
            },
            desc:"不能为空"
        },
        //正整数
        positiveInt:{
            fn: function (cb) {
                var reg = /^[0-9]*[1-9][0-9]*$/;
                cb&&cb(reg.test(this.origin));
            },
            desc:"必须是正整数"
        },
        //正浮点数
        positiveFloat:{
            /**
             * 验证输入是一个正浮点数
             * @param intLen：可设定整数部分长度
             * @param decimalLen：可设定小数部分长度(最小是1)
             * @param cb
             */
            fn: function (intLen,decimalLen,cb) {
                var reg = new RegExp(['^[0-9]{0,',intLen,'}(\\.[0-9]{0,',decimalLen,'})?$'].join(''))
                cb&&cb(reg.test(this.origin));
            },
            desc:"必须是整数位不超过{1},小数位不超过{2}的正数"
        },

        /**
         * 等于比较符号，使用==验证相等
         */
        equalTo:{
            fn: function (that, cb) {
                cb && cb(this.origin==that)
            },
            desc:"必须等于{1}"
        },
        /**
         * 等价比较符，更为严格，使用===进行比较
         */
        sameTo:{
            fn: function (that, cb) {
                cb && cb(this.origin===that)
            },
            desc:"必须等价于{1}"
        },
        biggerThan:{
            fn: function (that, cb) {
                cb && cb(this.origin>that)
            },
            desc:"必须大于{1}"
        },
        biggerEqualThan:{
            fn: function (that, cb) {
                cb && cb(this.origin>=that)
            },
            desc:"必须大于等于{1}"
        },
        smallerThan:{
            fn: function (that, cb) {
                cb && cb(this.origin<that)
            },
            desc:"必须小于{1}"
        },
        smallerEqualThan:{
            fn: function (that, cb) {
                cb && cb(this.origin<=that)
            },
            desc:"必须小于等于{1}"
        }
    }

    /**
     * 验证组构造器
     * PS:由于外部API用户往往是从开始验证一个字段来开启一个验证组，所以这2个参数和target的参数是一样的
     * @param param
     * @param desc
     * @constructor
     */
    function ValidateGroup(param,desc){
        var self = this;
        event.mixin(ValidateGroup);

        //一个验证组开启的时候，可以含有一个初始的验证字段
        self.targets=[];
        // if(param!==undefined){
            self.curTarget = new ValidateTarget(self,param,desc);
            self.targets.push(self.curTarget);
            //return target;
        // }
    }
    /**
     * 级联另外一个验证对象
     * @param param
     * @param desc
     */
    ValidateGroup.prototype.and = function(param,desc){
        var self = this;//save the this ref
        self.curTarget = new ValidateTarget(self,param,desc);
        self.targets.push(self.curTarget);
        return self;
        //return target; //返回target,这样api层面可以直接对对象进行验证操作
    };

    /**
     * 订阅验证组的失败事件
     *  回调函数参数：验证值对象，描述，失败的验证函数名，失败的验证参数
     * @param cb(val,desc,funcName,funcArgs，funcDesc)
     */
    ValidateGroup.prototype.failed= function (cb) {
        this.once("failed",cb)
        return this;
    }

    /**
     * 订阅验证组的成功事件
     * @param cb(val,desc)
     * @returns {ValidateGroup}
     */
    ValidateGroup.prototype.passed= function (cb) {
        this.once("passed",cb)
        return this;
    }
    /**
     * 开始运行验证器
     */
    ValidateGroup.prototype.run= function () {
        var self = this;//save the this ref

        return new Promise(function (resolve,reject) {

            if(self.targets && self.targets.length){
                //todo:遍历内部的验证器，一个个执行,并设置参数
                arrayExt.eachAsync(self.targets,function(target,idx,next,cancel){
                    target._failed(function (funcKey,args,funcDesc) {
                        self.emit("failed",target.origin,target.desc,funcKey,args,funcDesc);
                        resolve({pass:false,origin:target.origin,desc:target.desc,funcKey:funcKey,args:args,funcDesc:funcDesc})
                    })._passed(function () {
                        if(idx<self.targets.length-1){
                            next();
                        }else{
                            //如果都执行完了，说明成功
                            self.emit("passed",target.origin,target.desc)
                            resolve({pass:true,origin:target.origin,desc:target.desc})
                        }
                    })._run();
                })
            }else{
                //如果都执行完了，说明成功
                self.emit("passed");
                resolve({pass:true});
            }

        });

    }


    function ValidateTarget(group,param,desc){
        var self = this;

        event.mixin(ValidateTarget);

        self.group=group;//每个验证目标都有一个所属的验证组

        self.origin=param;//存储原始的值
        self.desc=desc;//存储值的描述
        //下面提供一些现成的标记，辅助进行参数校验
        self.isArray=Object.prototype.toString.call(param)==="[object Array]";
        self.type=typeof param;
        self.isNull=param===null;
        self.isUndefined=param===undefined;

        self.funcChain=[];//保存要在对象上进行的验证列表
    }
    /**
     * 为了API更加好用，每个target也提供and方法，用于级联更多的字段验证
     * @param param
     * @param desc
     * @returns {*}
     */
    ValidateTarget.prototype.and= function (param,desc) {
        return this.group.and.call(this.group,param,desc);
    }
    /**
     * 订阅失败事件
     * @param cb(funcKey,args)
     * @private
     */
    ValidateTarget.prototype._failed= function (cb) {
        this.once("failed",cb)
        return this;
    }

    ValidateTarget.prototype._passed= function (cb) {
        this.once("passed",cb)
        return this;
    }
    ValidateTarget.prototype.run= function () {
        return this.group.run();
    }
    ValidateTarget.prototype.failed= function (cb) {
        return this.group.failed(cb);
    }
    ValidateTarget.prototype.passed= function (cb) {
        return this.group.passed(cb);
    }
    /**
     * 开始运行验证器
     */
    ValidateTarget.prototype._run= function () {
        var self = this;//save the this ref

        if(self.funcChain && self.funcChain.length){
    
            //遍历内部的验证器，一个个执行,并设置参数
            arrayExt.eachAsync(self.funcChain,function(item,idx,next,cancel){
                var validateFunc = validateFunctions[item.key],
                    args = item.args;
        
                //组织入参，并调用内部的验证函数。入参的最后一个参数，总是回调
                validateFunc.fn.apply(self,args.concat(function (pass,otherErrMsg) {
                    if(pass){
                        if(idx<self.funcChain.length-1){
                            //如果还有验证函数没执行完，继续执行
                            next();
                        }else{
                            //如果都执行完了，说明成功
                            self.emit("passed")
                        }
                    }else{
                        //执行失败，发射failed消息
                        
                        
                        var errTemplate = validateFunc.desc;
    
                        //如果执行过程中发现了其他错误消息，则不使用验证项目的模板消息
                        if(otherErrMsg){
                            errTemplate=otherErrMsg;
                        }
                        //如果desc配置的是字符串，则支持占位符替换
                        if(typeof errTemplate ==='string'){
                            for(var i=0,j=args.length;i<j;i++){
                                var a = args[i];
                                errTemplate = errTemplate.replace("{"+(i+1)+'}',a)
                            }
                        }
                        //如果desc配置的是函数，则支持使用自定义函数返回提示信息
                        else if(typeof errTemplate ==='function'){
                            errTemplate = errTemplate.apply(self,args);
                        }
                        
                        
                        self.emit("failed",item.key,item.args,errTemplate)
                    }
                }));
            });
        }else{
            //成功
            self.emit("passed")
        }

    }
//保留的方法key,防止被冲
    var reservedKey={};
    for(var k in ValidateTarget.prototype){
        reservedKey[k] = true;
    }
    var _addHelperToTarget =function (key,func){
        ValidateGroup.prototype[key]= function () {
            var args = [].slice.call(arguments);

            this.curTarget.funcChain.push({key:key,args:args});
            return this;
        }
    }

//初始化内置验证方法
    for(var builtIn in validateFunctions){
        _addHelperToTarget(builtIn,validateFunctions[builtIn])
    }
    /**
     * 给验证库增加一个验证方法
     * @param key
     * @param func
     */
    exports.setValidateFunction = function (key,func) {
        if(key in reservedKey){
            throw new Error("key:"+key +" is reserved!")
        }else{
            validateFunctions[key] = func;
            _addHelperToTarget(key,func);
        }
    };
    /**
     * 将待验证对象包装起来，以便于进行后续的验证
     * @param param
     */
    exports.targetWrapper = function (param,desc) {
        return new ValidateGroup(param,desc);
    }
});