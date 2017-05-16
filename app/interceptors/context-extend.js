'use strict';
/**
 * Created by kaicui on 16/11/15.
 * 拦截器:用于在http 的 context 上添加一些helper方法，在action中就可以直接this.xxx使用了
 */


module.exports=async (ctx,next)=>{
    
    /**
     * 判断是否登录
     * @returns {boolean}
     */
    ctx.hasLogin=function () {
        var self = this;
        if(self.session && self.session.user){
            return true;
        }else{
            return false;
        }
    };
    /**
     * 获取 session user
     * @returns {*}
     */
    ctx.getSessionUser=function () {
        var self = this;
        if(self.session && self.session.user){
            return self.session.user;
        }else{
            return undefined;
        }
    };
    /**
     * 设置 session user
     * @param user
     * @returns {boolean}
     */
    ctx.setSessionUser=function (user) {
        var self = this;
        if(self.session){
            self.session.user = user;
            return true;
        }else{
            return false;
        }
    };
    
    await next();
}