# service 说明

service 是一组数据操作的集合，通常在业务上描述一个完整的业务操作。
service 内部可能调用多个dao方法

## service 调用 orm

### 直接写SQL

```js
        //1 查询数据
            let results = yield db.query(`
                SELECT *
                FROM ServiceResource ser

                WHERE ser.ServiceTypeName = :type
                `,
                {replacements: {type: type}, type: db.QueryTypes.SELECT}
            );
```