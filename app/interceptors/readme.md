# 说明

这里存放所有拦截器.

## interceptor 说明

* 每一个 Http 请求经过 koajs 都会交给一个 middle-ware 链条
* 每个 middle-ware 可以使用 yield next 把控制权交给后续的拦截器,然后执行完之后会返回 yield 的地方
