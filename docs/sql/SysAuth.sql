--   -------------------------------------------------- 
--   Generated by Enterprise Architect Version 11.0.1106
--   Created On : 星期四, 24 十一月, 2016 
--   DBMS       : MySql 
--   -------------------------------------------------- 

CREATE TABLE `SysAuth`
(
	`AuthKey` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '权限唯一标识',
	`AuthName` NVARCHAR(64) NOT NULL DEFAULT '' COMMENT '权限名称',
	`AuthDesc` NVARCHAR(128) NOT NULL DEFAULT '' COMMENT '权限描述',
	`Enable` BIT(1) NOT NULL COMMENT '是否开启。默认权限是开启的。 如果权限关闭，则所有具有该权限的角色都无法使用该权限',
	`CreateTime` DATETIME(0) NOT NULL DEFAULT now(),
	`UpdateTime` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`AuthKey`)

)  COMMENT='系统表：权限信息'
;


