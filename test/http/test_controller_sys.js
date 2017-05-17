/* 测试 sys controller */
const request = require("request-promise-native");
const expect = require('chai').expect;
const util = require('util');
const path = require('path');
const config = require("../../config/default");

var urlPrefix= `http://127.0.0.1:${config.server.port.toString()}`;
describe('controller: ', function () {
    this.timeout(300*1000);
    it('sys.getSysParam', function (done) {
    
        request.get(`${urlPrefix}/sys/getConfig`).then(function (ret) {
            console.log(util.inspect(ret));
            expect(ret).not.to.undefined;
            done();
        });
        
    });
    
});
