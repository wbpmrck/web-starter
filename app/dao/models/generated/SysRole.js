/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SysRole', {
		Id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: ''
		},
		Desc: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		Enable: {
			type: DataTypes.BOOLEAN,
			allowNull: false
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
		tableName: 'SysRole',
		timestamps: false,
		freezeTableName: true
	});
};
