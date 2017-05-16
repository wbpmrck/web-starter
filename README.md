# web-starter
a website skeleton which using most popular web framework and skills.speed up normal development.



# install

first go to project dir and install dependencies:

```bash
$ npm install
```

and run the script:

```bash
$ ./run.debug.sh
```

if succeed,you will see some outputs:

```bash

prepare staring service in [dev] mode,has debug log
INFO 14634: =====准备自动注册路由======
服务已启动，端口:[1234]
INFO 14634: --->正在注册controller:[/your dir/web-starter/app/controllers/index.js]
INFO 14634: -------->注册 action:[GET][/login]
INFO 14634: -------->注册 action:[GET][/]
INFO 14634: --->正在注册controller:[/your dir/web-starter/app/controllers/sys.js]
INFO 14634: -------->注册 action:[POST][/sys/addSysParam]
INFO 14634: -------->注册 action:[GET][/sys/getConfig]
INFO 14634: --->正在注册controller:[/your dir/web-starter/app/controllers/user.js]
INFO 14634: -------->注册 action:[GET][/user/regist/:accountName/:password]
INFO 14634: -------->注册 action:[GET][/user/login/:accountName/:password]
INFO 14634: -------->注册 action:[GET][/user/logout]
INFO 14634: -------->注册 action:[GET][/user/getLoginUser]
INFO 14634: =====路由注册完毕======
```
# file structure


# docs
the project have some `rules` that make code simple,see below articles for more details:

- [How Router works](./docs/router.md)
- [How Interceptor works](./docs/interceptor.md)
- [CRUD with ORM](./docs/orm.md)
- [logs](./docs/logs.md)
- [user and roles](./docs/user.md)


# test

# todo

see [todo list](./todo.md)