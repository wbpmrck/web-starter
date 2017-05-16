# ORM

this doc show how to use orm framework.

> in this framework we use [sequelize ORM](https://github.com/sequelize/sequelize) to visit mysql

### Create tables
first you should create your tables in MySql server.after finished,see below chapters.

### Generate models

`Model` is the javascript representation of the data table im mysql.

to use models,you don't need to write model yourself.

instead,your can run the `gen-model.sh` in `/app/dao/models`

> the sh accept params to identify the db:
    - ip
    - port
    - dbname
    - user
    - password


```bash
$ cd app/dao/models
$ ./gen-model.sh 127.0.0.1 3306 pitaya root kaicui
```

and you will see the output like below if succeed:

```bash

Executing (default): DESCRIBE `SysAccount`;
Executing (default): DESCRIBE `SysAccountRole`;
Executing (default): DESCRIBE `SysAuth`;
Executing (default): DESCRIBE `SysRole`;
Executing (default): DESCRIBE `SysRoleAuth`;
Executing (default): DESCRIBE `SystemParam`;
Done!
generate success!see in ./generated dir
```
and you will find models in `./generated` dir:
they look like this:
```js
/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SysAccount', {
		AccountName: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
			primaryKey: true
		},
		AccountPasswordSecret: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		Salt: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		CreateTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		UpdateTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'SysAccount',
		timestamps: false,
		freezeTableName: true
	});
};
```