/**
 * Created by kaicui on 16/11/15.
 * 拦截器:日志记录
 * 支持记录queryString,form数据等
 * 支持记录返回的json,如果返回页面，则只记录好费时间
 */

var logger = require('../log/logger')

module.exports= async (ctx,next)=>{
    var start = new Date;
    
    await next();
    // 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
    var ms = new Date - start;
    
    if(ctx.response.type==="application/json"){
        logger.debug('[%s]%s %s [%s]- cost %s ms \r\n response[%s] data: %s', start,ctx.method, ctx.url,JSON.stringify(ctx.request.body), ms,ctx.response.status,JSON.stringify(ctx.response.body));
        
    }else{
        logger.debug('[%s]%s %s [%s]- cost %s ms \r\n response[%s]', start,ctx.method, ctx.url,JSON.stringify(ctx.request.body), ms,ctx.response.status);
    }
}
