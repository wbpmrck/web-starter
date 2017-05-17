/* 测试 sys controller */
const request = require("request-promise-native");
const expect = require('chai').expect;
const assert = require('chai').assert;
const util = require('util');
const path = require('path');
const config = require("../../config/default");

var urlPrefix= `http://127.0.0.1:${config.server.port.toString()}`;
describe('controller: ', function () {
    this.timeout(5*1000);
    it('sys.getSysParam', function (done) {
    
        expect(function () {
            request.get(`${urlPrefix}/sys/getConfig`).then(function (ret) {
                console.log(util.inspect(ret));
                ret = JSON.parse(ret);
                expect(ret).not.to.undefined;
                expect(ret.code).equal("0000");
                expect(ret.desc).equal("成功");
                expect(ret.data).isArray;
                expect(ret.success).isTrue;
                done();
            });
        }).to.not.throw();
        
    });
    it('sys.addSysParam(not login)', function (done) {
    
        expect(function () {
            request.post(`${urlPrefix}/sys/addSysParam`,{form:{Category:"1",Key:"k1",Value:"v1"}}).then(function (ret) {
                console.log(util.inspect(ret));
                ret = JSON.parse(ret);
                expect(ret).not.to.undefined;
                expect(ret.code).equal("0001");
                expect(ret.desc).equal("用户未登录");
                expect(ret.data).to.be.undefined;
                expect(ret.success).isFalse;
                done();
            },function (err) {
                expect(err).to.be.undefined;
    
                done();
            });
        }).to.not.throw();
        
    });
    
});
