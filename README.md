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

## ./app
the main dir of the web
- controllers
    - the controller of the web
- dao
    - the `data access objects` of the web
- helper
    - some utils
- interceptors
    - interceptor deal with each request,some before the controller,some after it.
- log
    - the log helper
- routes
    - the routes automation logic.

    > you don't need to update this file

- service
    - services call `dao` to complete business ops.
- views
    - `view` is `server template`,put them here.
- static
    - static files here can be visite from http.

## ./config
here stays the configurations files.

## ./framework
the common utils/libs used by the web site.

# docs
the project have some `rules` that make code simple,see below articles for more details:

- [How Router works](./docs/router.md)
- [How Interceptor works](./docs/interceptor.md)
- [CRUD with ORM](./docs/orm.md)
- [logs](./docs/logs.md)
- [user and roles](./docs/user.md)


# test

## start server
because it's a web site,so you should start it first:

```bash
$ ./run.debug.sh
```
## run mysql

- install mysql in your machine
- execute the .sql files in [docs dir](./docs/sql)

## run test command
we use [mocha](https://mochajs.org) to test. the test command is simple:

```bash
$ npm test
```

# todo

see [todo list](./todo.md)