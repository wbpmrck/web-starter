--   -------------------------------------------------- 
--   Generated by Enterprise Architect Version 11.0.1106
--   Created On : 星期四, 24 十一月, 2016 
--   DBMS       : MySql 
--   -------------------------------------------------- 

CREATE TABLE `SysAccountRole`
(
	`Id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '自增长id',
	`AccountName` NVARCHAR(64) NOT NULL DEFAULT '' COMMENT '账户名',
	`RoleId` BIGINT NOT NULL DEFAULT -1 COMMENT '角色id',
	`CreateTime` DATETIME(0) NOT NULL DEFAULT now(),
	`UpdateTime` DATETIME(0) NOT NULL DEFAULT now(),
	PRIMARY KEY (`Id`)

)  COMMENT='系统表：账户角色关系'
;


