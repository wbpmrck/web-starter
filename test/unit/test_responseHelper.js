/* global describe, it */

const expect = require('chai').expect;
const util = require('util');

const responseHelper = require("../../framework/web/responseHelper")


describe("responseHelper", function () {
    
    describe('success method ', function () {
        this.timeout(300*1000);
        it('should work without params.', function () {
            var context ={};
            
            //创建一个
            responseHelper.success({},context);
            
            console.log(util.inspect(context))
            
            expect(context.body.code).to.eql(responseHelper.codes.SUCCESS[0]);
            expect(context.body.desc).to.eql("成功");
            expect(context.body.data).to.undefined;
        });
        it('should can custom desc.', function () {
            var context ={};
            
            //创建一个
            responseHelper.success({desc:"查询用户"},context);
            
            console.log(util.inspect(context))
            
            expect(context.body.code).to.eql("0000");
            expect(context.body.desc).to.eql("成功查询用户");
            expect(context.body.data).to.undefined;
        });
        it('should can return data.', function () {
            var context ={};
            
            //创建一个
            responseHelper.success({desc:"查询用户",data:[{id:1,name:'张三'}]},context);
            
            console.log(util.inspect(context,{depth:null}))
            
            expect(context.body.code).to.eql("0000");
            expect(context.body.desc).to.eql("成功查询用户");
            expect(context.body.data).to.have.length(1);
            expect(context.body.data[0]).to.be.an('object'); //是一个对象
            expect(context.body.data[0]).to.have.keys(['id','name']); //里面有一些key
        });
    });
    
    describe('failed method ', function () {
        this.timeout(300*1000);
        it('should work without params.', function () {
            var context ={};
            
            //创建一个
            responseHelper.failed({},context);
            
            console.log(util.inspect(context))
            
            expect(context.body.code).to.eql("0002");
            expect(context.body.desc).to.eql("服务错误:");
            expect(context.body.data).to.undefined;
        });
        it('should can custom code&desc.', function () {
            var context ={};
            
            //创建一个
            responseHelper.failed({code:responseHelper.codes.NOT_LOGIN,desc:",sessionid:123"},context);
            
            console.log(util.inspect(context))
            
            expect(context.body.code).to.eql("0001");
            expect(context.body.desc).to.eql("用户未登录,sessionid:123");
            expect(context.body.data).to.undefined;
        });
        it('should can return data.', function () {
            var context ={};
            
            //创建一个
            responseHelper.failed({code:responseHelper.codes.NOT_LOGIN,desc:",sessionid:123",data:{sessionid:123}},context);
            
            console.log(util.inspect(context,{depth:null}))
            
            expect(context.body.code).to.eql("0001");
            expect(context.body.desc).to.eql("用户未登录,sessionid:123");
            expect(context.body.data).to.be.an('object'); //是一个对象
            expect(context.body.data).to.have.keys(['sessionid']); //里面有一些key
        });
    });
    
    
    describe("with no context ", function () {
        beforeEach(function () {
            //run before each test
        });
        afterEach(function () {
            //run after each test
        });
        
        it("will return object", function () {
            
            //不带参数，会把返回对象直接返回
            let ret = responseHelper.success({});
            
            console.log(util.inspect(ret))
            
            expect(ret.code).to.eql("0000");
            expect(ret.desc).to.eql("成功");
            expect(ret.data).to.undefined;
            
        });
    });
});