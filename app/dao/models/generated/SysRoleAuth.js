/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SysRoleAuth', {
		Id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		RoleId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: '-1'
		},
		AuthKey: {
			type: DataTypes.STRING,
			allowNull: true,
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
		tableName: 'SysRoleAuth',
		timestamps: false,
		freezeTableName: true
	});
};
