/**
 * Created by cuikai on 2015/10/16.
 * 数组常用的一些辅助方法
 */

if(typeof module !== 'undefined'){
    define = function (name, deps, factory) {
        module.exports = factory(require,module.exports,module)||module.exports
    }
}

define('OneLib.Utils.Array', [], function (require, exports, module) {

    /**
     * 一个异步对数组进行遍历处理的辅助方法
     * @param ar：要遍历的数组
     * @param asyncFunc：异步处理方法，function(item,next,cancel)
     *
     * demo:
     *  eachAsync([1,2,3,4],function(item,idx,next,cancel){
        console.log('running on:'+item);
        setTimeout(function(){next();},1000);
    })

     running on:1  (1s)
     running on:2  (2s)
     running on:3  (3s)
     running on:4  (4s)
     */
    exports.eachAsync = function (ar, asyncFunc) {
        function _each(ar,now,asyncFunc){
            var _item = ar[now];

            asyncFunc && asyncFunc(_item,now, function _next() {
                if(now == ar.length-1){
                    return;
                }else{
                    _each(ar,now+1,asyncFunc)
                }
            }, function _cancel() {
                return
            });
        }
        if(ar && ar.length>0){
            _each(ar,0,asyncFunc);
        }
    }

    /**
     * 去除数组里重复项的helper
     * @reverseOrder:遍历顺序，false为正序，true为逆序  默认正序：从0->length-1.
     * @param identifier(可选):filter函数，其用于决定item中的什么字段来决定item的唯一性
     * @private
     */
    exports.removeDump = function(arr,reverseOrder,/* optional */identifier){
        var _dic={},cut=false;
        if(!identifier){
            identifier = function(item){return item};
        }
        if(reverseOrder){
            for(var i=arr.length-1;i>=0;i--){
                var _item = arr[i],_key = identifier(_item);
                if(_dic[_key]){
                    cut = true;
                    arr.splice(i,1)
                }else{
                    cut=false;
                    _dic[_key] = true
                }
            }

        }else{
            for(var i= 0,j=arr.length;i<j;(cut&&j--) || i++){
                var _item = arr[i],_key = identifier(_item);
                if(_dic[_key]){
                    cut = true;
                    arr.splice(i,1)
                }else{
                    cut=false;
                    _dic[_key] = true
                }
            }
        }
    }

});