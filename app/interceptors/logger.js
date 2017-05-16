/**
 * Created by kaicui on 16/11/15.
 * 拦截器:日志记录
 * 支持记录queryString,form数据等
 * 支持记录返回的json,如果返回页面，则只记录好费时间
 */

var logger = require('../log/logger')

module.exports=function *(next){
    var start = new Date;

    yield next;
    // 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
    var ms = new Date - start;

    if(this.response.type==="application/json"){
        logger.debug('[%s]%s %s [%s]- cost %s ms \r\n response data: %s', start,this.method, this.url,JSON.stringify(this.request.body), ms,JSON.stringify(this.response.body));

    }else{
        logger.debug('[%s]%s %s [%s]- cost %s ms', start,this.method, this.url,JSON.stringify(this.request.body), ms);
    }
}
