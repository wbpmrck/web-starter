var config={
    app: {
        name: 'pitaya',
        domainPrefix:"", //动态网站部署的一级目录名，为""表示端口根目录
        // domainPrefix:"/service", //动态网站部署的一级目录名，为""表示端口根目录
        version: '0.0.1'
    },
    server: {
        port: 1234
    },
    db :{
        modelPath: require('path').join(__dirname, '../app/dao/models/generated'),
        db: 'pitaya',
        username: 'root',
        password: 'kaicui',
        // password: 'root',
        dialect: 'mysql',
        host: '127.0.0.1',
        // host: '172.31.4.21',
        port: 3306,
        pool: {
            maxConnections: 10,
            minConnections: 0,
            maxIdleTime: 30000
        }
    },

    template: {
        path: 'app/views',
        options: {
            // map: { ect: 'ect' }
            map: { html: 'ect' }
        }
    },
    static:{
        path:"app/static"
    },
    session: {
        key: 'koa:sess2', /** (string) cookie key (default is koa:sess) */
        maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: false, /** (boolean) signed or not (default true) */
    }
};
//如果是prod环境,则取消sql的日志
if(process.env.NODE_DEBUG && process.env.NODE_DEBUG.indexOf('debug')<0){
    console.log('关闭mysql日志')
    config.db.logging = false;
}
module.exports = config;