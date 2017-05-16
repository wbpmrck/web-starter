/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SysAccountRole', {
		Id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		AccountName: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		RoleId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '-1'
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
		tableName: 'SysAccountRole',
		timestamps: false,
		freezeTableName: true
	});
};
